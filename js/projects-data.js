/**
 * Projects Database Management
 * Stores and manages projects using localStorage
 */

const ProjectsDB = {
  STORAGE_KEY: 'abhiraj_projects',

  mergeCatalogData(project) {
    const template = this.DEFAULT_PROJECTS.find((p) => p.id === project.id);
    if (!template) return project;

    return {
      ...template,
      ...project,
      overview: { ...(template.overview || {}), ...(project.overview || {}) },
      specifications: { ...(template.specifications || {}), ...(project.specifications || {}) },
      location: { ...(template.location || {}), ...(project.location || {}) },
      parking: { ...(template.parking || {}), ...(project.parking || {}) },
      developer: { ...(template.developer || {}), ...(project.developer || {}) },
      contact: { ...(template.contact || {}), ...(project.contact || {}) },
      highlights: (Array.isArray(project.highlights) && project.highlights.length) ? project.highlights : (template.highlights || []),
      units: (Array.isArray(project.units) && project.units.length) ? project.units : (template.units || []),
      amenities: (Array.isArray(project.amenities) && project.amenities.length) ? project.amenities : (template.amenities || []),
      floorPlans: (Array.isArray(project.floorPlans) && project.floorPlans.length) ? project.floorPlans : (template.floorPlans || []),
      gallery: (Array.isArray(project.gallery) && project.gallery.length) ? project.gallery : (template.gallery || []),
      sustainability: (Array.isArray(project.sustainability) && project.sustainability.length) ? project.sustainability : (template.sustainability || [])
    };
  },

  buildRichProject(project) {
    const now = new Date().toISOString();
    const base = {
      id: 'proj_' + Date.now(),
      schemaVersion: 2,
      slug: '',
      title: '',
      tag: '',
      description: '',
      image: '',
      brochurePdf: '',
      featured: false,
      order: 99,
      status: 'ongoing',
      createdAt: now,
      updatedAt: now,
      overview: {
        type: 'Residential',
        configuration: '',
        totalFloors: '',
        totalUnits: '',
        possession: '',
        rera: ''
      },
      highlights: [],
      units: [],
      amenities: [],
      specifications: {
        kitchen: [],
        flooring: [],
        bathroom: [],
        electrification: [],
        doorsWindows: [],
        structure: []
      },
      floorPlans: [],
      gallery: [],
      sustainability: [],
      location: {
        address: '',
        mapEmbed: '',
        nearby: []
      },
      parking: {
        type: '',
        evCharging: false,
        planImage: '',
        image: ''
      },
      developer: {
        name: '',
        architect: '',
        structuralConsultant: '',
        legalAdvisor: ''
      },
      contact: {
        salesPerson: '',
        phone: '',
        email: ''
      }
    };

    const merged = {
      ...base,
      ...project,
      overview: { ...base.overview, ...(project.overview || {}) },
      specifications: { ...base.specifications, ...(project.specifications || {}) },
      location: { ...base.location, ...(project.location || {}) },
      parking: { ...base.parking, ...(project.parking || {}) },
      developer: { ...base.developer, ...(project.developer || {}) },
      contact: { ...base.contact, ...(project.contact || {}) }
    };

    if (!merged.slug && merged.title) {
      merged.slug = merged.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    merged.createdAt = merged.createdAt || now;
    merged.updatedAt = merged.updatedAt || now;
    return merged;
  },
  
  // Default projects - Pre-populated with existing projects
  DEFAULT_PROJECTS: [
    {
      id: 'proj_rajyog',
      schemaVersion: 2,
      slug: 'rajyog',
      title: 'Rajyog',
      description: 'Residential project',
      image: './images/home/bg_rajyog.jpg',
      tag: 'Residential',
      brochurePdf: '',
      featured: true,
      order: 0,
      status: 'ongoing',
      overview: {
        type: 'Residential',
        configuration: '1 BHK',
        totalFloors: 7,
        totalUnits: 42,
        possession: 'Dec 2026',
        rera: 'MAHARERA-PENDING'
      },
      highlights: [
        'Prime location with strong connectivity',
        'Solar system for common areas',
        'Video door phone and CCTV surveillance',
        'Lift with battery backup'
      ],
      units: [
        { type: '1 BHK', carpetArea: '', balconyArea: '' },
        { type: '2 BHK', carpetArea: '', balconyArea: '' }
      ],
      amenities: [
        { name: 'Gazebo', icon: '' },
        { name: 'Yoga Space', icon: '' },
        { name: 'Terrace Garden', icon: '' },
        { name: 'Terrace Sit-out', icon: '' },
        { name: 'CCTV Surveillance', icon: '' },
        { name: 'Lift with Battery Backup', icon: '' },
        { name: 'Video Door Phone', icon: '' },
        { name: 'Solar for Common Areas', icon: '' }
      ],
      specifications: {
        kitchen: ['Granite kitchen platform', 'Stainless steel sink', 'Glazed tiles up to platform height', 'RO water provision'],
        flooring: ['Vitrified tiles in all rooms'],
        bathroom: ['Anti-skid flooring', 'Granite door frames', 'Concealed plumbing'],
        electrification: ['Concealed wiring', 'Modular switches', 'Inverter point', 'AC point in master bedroom'],
        doorsWindows: ['Decorative main door', 'Night latch with name plate', 'Laminated frames', 'Sliding windows with mosquito net'],
        structure: ['RCC earthquake-resistant structure']
      },
      floorPlans: [
        { type: 'Ground Floor Plan', image: '' },
        { type: 'Typical Floor Plan', image: '' },
        { type: '1 BHK Unit Plan', image: '' },
        { type: '2 BHK Unit Plan', image: '' }
      ],
      gallery: ['./images/home/bg_rajyog.jpg'],
      sustainability: ['Solar energy system for common lighting', 'Rainwater harvesting', 'Borewell water supply'],
      location: {
        address: 'Nashik, Maharashtra',
        mapEmbed: '',
        nearby: [
          { place: 'Mumbai Agra Highway', distance: '4.2 km' },
          { place: 'Railway Station', distance: '10 km' }
        ]
      },
      parking: {
        type: 'Mechanical + Stilt Parking',
        evCharging: true,
        planImage: '',
        image: ''
      },
      developer: {
        name: 'Somvijay Developers',
        architect: 'PDP Architects',
        structuralConsultant: 'Er. Manish Bothra',
        legalAdvisor: 'Adv. Manoj Chavhan'
      },
      contact: {
        salesPerson: 'Manish Dhivar',
        phone: '+919637661116',
        email: 'info@abhirajinfra.in'
      }
    },
    {
      id: 'proj_yashodhara',
      schemaVersion: 2,
      slug: 'yashodhara-girls-hostel',
      title: 'Yashodhara Girls Hostel',
      description: 'Girls hostel facility',
      image: './images/home/bg_yashodhra_girls_hostel.jpg',
      tag: 'Hostel',
      brochurePdf: '',
      featured: true,
      order: 1,
      status: 'completed',
      overview: {
        type: 'Hostel',
        configuration: 'Girls Hostel',
        totalFloors: 5,
        totalUnits: 60,
        possession: 'Completed',
        rera: 'N/A'
      },
      highlights: [
        'Designed for student comfort',
        'Secure access control',
        'Well-connected location'
      ],
      units: [
        { type: 'Shared Hostel Unit', carpetArea: '', balconyArea: '' }
      ],
      amenities: [
        { name: 'Security Desk', icon: '' },
        { name: 'Common Study Zone', icon: '' },
        { name: 'Lift Access', icon: '' }
      ],
      specifications: {
        kitchen: ['Shared pantry area'],
        flooring: ['Easy-maintenance tiles'],
        bathroom: ['Anti-skid bathroom flooring'],
        electrification: ['Power backup for common areas'],
        doorsWindows: ['Secure room doors'],
        structure: ['RCC framed structure']
      },
      floorPlans: [],
      gallery: ['./images/home/bg_yashodhra_girls_hostel.jpg'],
      sustainability: ['Solar-powered common lighting'],
      location: {
        address: 'Nashik, Maharashtra',
        mapEmbed: '',
        nearby: [
          { place: 'College Cluster', distance: '1.0 km' },
          { place: 'Bus Stop', distance: '400 m' }
        ]
      },
      parking: {
        type: 'Two Wheeler Parking',
        evCharging: false,
        planImage: '',
        image: ''
      },
      developer: {
        name: 'Abhiraj Infra Realty',
        architect: '',
        structuralConsultant: '',
        legalAdvisor: ''
      },
      contact: {
        salesPerson: '',
        phone: '+919637661116',
        email: 'info@abhirajinfra.in'
      }
    },
    {
      id: 'proj_sudhan',
      schemaVersion: 2,
      slug: 'sudhan-tower',
      title: 'Sudhan Tower',
      description: 'Commercial tower project',
      image: './images/home/sudhan_tower.jpg',
      tag: 'Commercial',
      brochurePdf: '',
      featured: true,
      order: 2,
      status: 'ongoing',
      overview: {
        type: 'Commercial',
        configuration: 'Shops + Offices',
        totalFloors: 10,
        totalUnits: 80,
        possession: 'Jun 2027',
        rera: 'MAHARERA-PENDING'
      },
      highlights: [
        'High-visibility frontage',
        'Commercial-grade infrastructure',
        'Future-ready services'
      ],
      units: [
        { type: 'Commercial Unit', carpetArea: '', balconyArea: '' }
      ],
      amenities: [
        { name: 'High-speed Lift', icon: '' },
        { name: 'Fire Safety Systems', icon: '' },
        { name: 'Dedicated Utility Zones', icon: '' }
      ],
      specifications: {
        kitchen: [],
        flooring: ['Commercial grade vitrified tiles'],
        bathroom: ['Anti-skid common restroom flooring'],
        electrification: ['Concealed commercial wiring'],
        doorsWindows: ['Aluminum glazing system'],
        structure: ['RCC framed seismic-compliant structure']
      },
      floorPlans: [],
      gallery: ['./images/home/sudhan_tower.jpg'],
      sustainability: ['Rainwater harvesting'],
      location: {
        address: 'Nashik, Maharashtra',
        mapEmbed: '',
        nearby: [
          { place: 'Main Road', distance: '300 m' },
          { place: 'Market', distance: '700 m' }
        ]
      },
      parking: {
        type: 'Basement + Surface Parking',
        evCharging: true,
        planImage: '',
        image: ''
      },
      developer: {
        name: 'Abhiraj Infra Realty',
        architect: '',
        structuralConsultant: '',
        legalAdvisor: ''
      },
      contact: {
        salesPerson: '',
        phone: '+919637661116',
        email: 'info@abhirajinfra.in'
      }
    },
    {
      id: 'proj_nikam',
      schemaVersion: 2,
      slug: 'mr-nikam',
      title: 'Mr. Nikam',
      description: 'Residential development',
      image: './images/home/mr_nikam.jpg',
      tag: 'Residential',
      brochurePdf: '',
      featured: true,
      order: 3,
      status: 'completed',
      overview: {
        type: 'Residential',
        configuration: 'Custom Residence',
        totalFloors: 3,
        totalUnits: 1,
        possession: 'Completed',
        rera: 'N/A'
      },
      highlights: [
        'Client-specific design approach',
        'High quality workmanship',
        'Efficient space planning'
      ],
      units: [
        { type: 'Custom Residential Layout', carpetArea: '', balconyArea: '' }
      ],
      amenities: [
        { name: 'Custom Interiors', icon: '' },
        { name: 'Utility Terrace', icon: '' }
      ],
      specifications: {
        kitchen: ['Modular kitchen layout'],
        flooring: ['Premium vitrified flooring'],
        bathroom: ['Designer bathroom fittings'],
        electrification: ['Concealed residential wiring'],
        doorsWindows: ['Decorative main door'],
        structure: ['RCC framed residential structure']
      },
      floorPlans: [],
      gallery: ['./images/home/mr_nikam.jpg'],
      sustainability: [],
      location: {
        address: 'Nashik, Maharashtra',
        mapEmbed: '',
        nearby: []
      },
      parking: {
        type: 'Private Parking',
        evCharging: false,
        planImage: '',
        image: ''
      },
      developer: {
        name: 'Abhiraj Infra Realty',
        architect: '',
        structuralConsultant: '',
        legalAdvisor: ''
      },
      contact: {
        salesPerson: '',
        phone: '+919637661116',
        email: 'info@abhirajinfra.in'
      }
    }
  ],

  /**
   * Get all projects
   */
  getAll() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const normalized = parsed
            .map((project) => this.mergeCatalogData(project))
            .map((project) => this.buildRichProject(project));
          return normalized;
        }
      }
    } catch (e) {
      console.warn('ProjectsDB: Error reading from localStorage', e);
    }
    // Initialize with defaults if empty
    const defaults = this.DEFAULT_PROJECTS.map((project) => this.buildRichProject(project));
    this.saveAll(defaults);
    return JSON.parse(JSON.stringify(defaults));
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
    const next = this.buildRichProject(project);
    next.id = next.id || ('proj_' + Date.now());
    next.order = next.order ?? all.length;
    next.featured = !!next.featured;
    next.createdAt = next.createdAt || new Date().toISOString();
    all.push(next);
    this.saveAll(all);
    return next;
  },

  /**
   * Update existing project
   */
  update(id, updates) {
    const all = this.getAll();
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return null;
    all[idx] = this.buildRichProject({ ...all[idx], ...updates, id });
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
    const defaults = this.DEFAULT_PROJECTS.map((project) => this.buildRichProject(project));
    this.saveAll(JSON.parse(JSON.stringify(defaults)));
  }
};
