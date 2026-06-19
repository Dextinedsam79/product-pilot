import React, { useState, useEffect } from 'react';
import { Bot, FileText, Download, Loader2, Sparkles, FolderOpen, Save, Trash2, Plus } from 'lucide-react';
import Markdown from 'react-markdown';
import { Project, Artifact, ArtifactType } from './types';

const artifactLabels: Record<ArtifactType, string> = {
  'brd': 'Business Requirements',
  'prd': 'Product Requirements',
  'user-stories': 'User Stories',
  'acceptance-criteria': 'Acceptance Criteria',
  'test-cases': 'Test Cases'
};

function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('productpilot_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [idea, setIdea] = useState('');
  
  // Update local storage when projects change
  useEffect(() => {
    localStorage.setItem('productpilot_projects', JSON.stringify(projects));
  }, [projects]);

  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNewProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: `Project ${projects.length + 1}`,
      idea: '',
      createdAt: Date.now(),
      artifacts: []
    };
    setProjects([newProject, ...projects]);
    setActiveProject(newProject);
    setIdea('');
    setActiveArtifact(null);
  };

  const loadProject = (project: Project) => {
    setActiveProject(project);
    setIdea(project.idea);
    setActiveArtifact(project.artifacts[project.artifacts.length - 1] || null);
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(projects.filter(p => p.id !== id));
    if (activeProject?.id === id) {
      setActiveProject(null);
      setIdea('');
      setActiveArtifact(null);
    }
  };

  const updateActiveProjectIdea = (newIdea: string) => {
    setIdea(newIdea);
    if (activeProject) {
      const updated = { ...activeProject, idea: newIdea };
      setActiveProject(updated);
      setProjects(projects.map(p => p.id === activeProject.id ? updated : p));
    }
  };

  const handleGenerate = async (type: ArtifactType) => {
    if (!idea.trim()) return;
    
    // Ensure we have an active project to attach artifacts to
    let currentProj = activeProject;
    if (!currentProj) {
      currentProj = {
        id: crypto.randomUUID(),
        name: idea.substring(0, 30) + (idea.length > 30 ? '...' : ''),
        idea: idea,
        createdAt: Date.now(),
        artifacts: []
      };
      setProjects([currentProj, ...projects]);
      setActiveProject(currentProj);
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, artifactType: type })
      });
      
      let data;
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Server returned an unexpected response (${response.status}). Please try again later.`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate');
      }
      
      const newArtifact: Artifact = {
        id: crypto.randomUUID(),
        type,
        content: data.content,
        createdAt: Date.now()
      };
      
      const updatedProj = {
        ...currentProj,
        idea: idea,
        artifacts: [...currentProj.artifacts, newArtifact]
      };
      
      setActiveProject(updatedProj);
      setProjects(prev => prev.map(p => p.id === updatedProj.id ? updatedProj : p));
      setActiveArtifact(newArtifact);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!activeArtifact) return;
    const blob = new Blob([activeArtifact.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artifactLabels[activeArtifact.type].toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 md:p-12">
      <header className="w-full max-w-4xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-4 border border-slate-100">
          <Bot className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight mb-3">ProductPilot</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          AI-powered business analysis. Describe your project idea and instantly generate professional documentation.
        </p>
      </header>

      {projects.length > 0 && (
        <div className="w-full max-w-4xl mb-6 flex items-center overflow-x-auto pb-2 scrollbar-hide gap-3">
          <button
            onClick={startNewProject}
            className="flex-shrink-0 inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
          
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          
          {projects.map(p => (
            <div 
              key={p.id}
              onClick={() => loadProject(p)}
              className={`flex-shrink-0 flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors border ${
                activeProject?.id === p.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <FolderOpen className="w-4 h-4 mr-2 opacity-70" />
              <span className="max-w-[120px] truncate">{p.name || 'Untitled'}</span>
              <button 
                onClick={(e) => deleteProject(p.id, e)}
                className={`ml-2 p-1 rounded-full opacity-60 hover:opacity-100 ${
                  activeProject?.id === p.id ? 'hover:bg-blue-500' : 'hover:bg-slate-200'
                }`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <main className="w-full max-w-4xl space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <label htmlFor="idea" className="block text-sm font-medium text-slate-700 mb-2">
            Business Idea
          </label>
          <textarea
            id="idea"
            rows={4}
            className="w-full rounded-2xl border-slate-200 bg-slate-50 p-4 text-slate-900 focus:border-blue-500 focus:ring-blue-500 resize-none"
            placeholder="Describe your product or feature idea in detail..."
            value={idea}
            onChange={(e) => updateActiveProjectIdea(e.target.value)}
          />

          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 mb-3">Generate Artifacts</p>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(artifactLabels) as ArtifactType[]).map((type) => (
                <button
                  key={type}
                  disabled={!idea.trim() || isLoading}
                  onClick={() => handleGenerate(type)}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                  {artifactLabels[type]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-start">
            <div className="mt-0.5">
              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            {error}
          </div>
        )}

        {(isLoading || activeProject?.artifacts.length) ? (
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 transition-all duration-300 ease-in-out">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 overflow-x-auto">
              <div className="flex items-center gap-2">
                {activeProject?.artifacts.map(art => (
                  <button
                    key={art.id}
                    onClick={() => setActiveArtifact(art)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center max-w-full ${
                      activeArtifact?.id === art.id
                        ? 'bg-slate-200 text-slate-800'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap">{artifactLabels[art.type]}</span>
                  </button>
                ))}
                {isLoading && (
                  <div className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-500">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </div>
                )}
              </div>
              {!isLoading && activeArtifact && (
                <button
                  onClick={handleExport}
                  className="flex-shrink-0 ml-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export MD
                </button>
              )}
            </div>
            
            <div className="p-8">
              {isLoading && !activeArtifact ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
                  <p>Analyzing requirements and writing documentation...</p>
                </div>
              ) : activeArtifact ? (
                <div className="markdown-body text-slate-800">
                  <Markdown>{activeArtifact.content}</Markdown>
                </div>
              ) : (
                 <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                  <FileText className="w-8 h-8 mb-4 opacity-50" />
                  <p>Select an artifact to view</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
