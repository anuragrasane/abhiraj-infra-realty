/**
 * Projects Database Management
 * Stores and manages projects using localStorage
 */

const ProjectsDB = {
  STORAGE_KEY: 'abhiraj_projects',
  
  // Default projects - Pre-populated with existing projects
  DEFAULT_PROJECTS: [
    {
      id: 'proj_rajyog',
      title: 'Rajyog',
      description: 'Residential project',
      image: './images/home/bg_rajyog.jpg',
      tag: 'Residential',
      featured: true,
      order: 0
    },
    {
      id: 'proj_yashodhara',
      title: 'Yashodhara Girls Hostel',
      description: 'Girls hostel facility',
      image: './images/home/bg_yashodhra_girls_hostel.jpg',
      tag: 'Hostel',
      featured: true,
      order: 1
    },
    {
      id: 'proj_sudhan',
      title: 'Sudhan Tower',
      description: 'Commercial tower project',
      image: './images/home/sudhan_tower.jpg',
      tag: 'Commercial',
      featured: true,
      order: 2
    },
    {
      id: 'proj_nikam',
      title: 'Mr. Nikam',
      description: 'Residential development',
      image: './images/home/mr_nikam.jpg',
      tag: 'Residential',
      featured: true,
      order: 3
    }
  ],

  /**
   * Get all projects
   */
  getAll() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('ProjectsDB: Error reading from localStorage', e);
    }
    // Initialize with defaults if empty
    this.saveAll(this.DEFAULT_PROJECTS);
    return JSON.parse(JSON.stringify(this.DEFAULT_PROJECTS));
  },

  /**
   * Save all projects
   */
  saveAll(projects) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
      return true;
    } catch (e) {
      console.warn('ProjectsDB: localStorage quota exceeded or unavailable.', e);
      return false;
    }
  },

  /**
   * Get featured projects (max 4)
   */
  getFeatured() {
    return this.getAll()
      .filter(p => p.featured)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      .slice(0, 4);
  },

  /**
   * Get single project by ID
   */
  getById(id) {
    return this.getAll().find(p => p.id === id) || null;
  },

  /**
   * Add new project
   */
  add(project) {
    const all = this.getAll();
    project.id = project.id || ('proj_' + Date.now());
    project.order = project.order ?? all.length;
    project.featured = !!project.featured;
    all.push(project);
    this.saveAll(all);
    return project;
  },

  /**
   * Update existing project
   */
  update(id, updates) {
    const all = this.getAll();
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...updates };
    this.saveAll(all);
    return all[idx];
  },

  /**
   * Delete project
   */
  delete(id) {
    const all = this.getAll();
    const filtered = all.filter(p => p.id !== id);
    this.saveAll(filtered);
    return true;
  },

  /**
   * Reset to default projects
   */
  reset() {
    this.saveAll(JSON.parse(JSON.stringify(this.DEFAULT_PROJECTS)));
  }
};
