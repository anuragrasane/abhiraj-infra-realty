/**
 * Admin Panel JavaScript
 * Handles authentication, project management, and UI interactions
 */

const AdminPanel = {
  ADMIN_PASSWORD: 'admin@2025',
  AUTH_KEY: 'abhiraj_admin_auth',
  currentEditingId: null,

  /**
   * Initialize admin panel
   */
  init() {
    if (this.isAuthenticated()) {
      this.showDashboard();
    } else {
      this.showLogin();
    }
    this.attachEventListeners();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return sessionStorage.getItem(this.AUTH_KEY) === 'true';
  },

  /**
   * Authenticate user
   */
  login(password) {
    if (password === this.ADMIN_PASSWORD) {
      sessionStorage.setItem(this.AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  /**
   * Logout user
   */
  logout() {
    sessionStorage.removeItem(this.AUTH_KEY);
    this.currentEditingId = null;
    this.showLogin();
  },

  /**
   * Show login screen
   */
  showLogin() {
    document.getElementById('loginScreen').classList.add('show');
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminPass').value = '';
    document.getElementById('loginError').style.display = 'none';
  },

  /**
   * Show dashboard
   */
  showDashboard() {
    document.getElementById('loginScreen').classList.remove('show');
    document.getElementById('adminDashboard').style.display = 'flex';
    this.loadProjects();
  },

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('adminPass').value;
      if (this.login(password)) {
        this.showDashboard();
      } else {
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('adminPass').value = '';
      }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
      this.logout();
    });

    // Add project button
    document.getElementById('addProjectBtn').addEventListener('click', () => {
      this.openProjectModal();
    });

    // Project form submit
    document.getElementById('projectForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProject();
    });

    // Close modal button
    document.getElementById('closeModalBtn').addEventListener('click', () => {
      this.closeProjectModal();
    });

    // Close modal on overlay click
    document.getElementById('projectModal').addEventListener('click', (e) => {
      if (e.target.id === 'projectModal') {
        this.closeProjectModal();
      }
    });

    // Image upload area
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageFileInput = document.getElementById('projectImage');

    imageUploadArea.addEventListener('click', () => {
      imageFileInput.click();
    });

    imageUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      imageUploadArea.classList.add('dragover');
    });

    imageUploadArea.addEventListener('dragleave', () => {
      imageUploadArea.classList.remove('dragover');
    });

    imageUploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      imageUploadArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        imageFileInput.files = files;
        this.handleImageUpload(files[0]);
      }
    });

    imageFileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleImageUpload(e.target.files[0]);
      }
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        this.switchSection(sectionId);
      });
    });

    // Settings buttons
    document.getElementById('resetProjectsBtn').addEventListener('click', () => {
      if (confirm('Are you sure? This will reset all projects to defaults.')) {
        ProjectsDB.reset();
        this.loadProjects();
        alert('Projects reset to defaults!');
      }
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
      this.exportProjects();
    });
  },

  /**
   * Handle image upload
   */
  handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      document.getElementById('projectImage').dataset.imageData = imageData;
      
      // Show preview
      const preview = document.getElementById('imagePreview');
      const previewImg = document.getElementById('previewImg');
      previewImg.src = imageData;
      preview.style.display = 'block';
      document.getElementById('imageUploadArea').style.display = 'none';
    };
    reader.readAsDataURL(file);
  },

  /**
   * Load and display projects
   */
  loadProjects() {
    const projects = ProjectsDB.getAll();
    const projectsList = document.getElementById('projectsList');

    if (projects.length === 0) {
      projectsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <p>No projects yet. Create your first project!</p>
        </div>
      `;
      return;
    }

    projectsList.innerHTML = projects.map(project => `
      <div class="proj-card" data-id="${project.id}">
        <img class="proj-card-thumb" src="${project.image}" alt="${project.title}" onerror="this.src='../images/logo.png'">
        <div class="proj-card-body">
          <span class="proj-card-tag">${project.tag || 'Uncategorized'}</span>
          <h3 class="proj-card-title">${project.title}</h3>
          <p class="proj-card-desc">${project.description}</p>
          <div class="proj-card-meta">
            <div class="proj-card-meta-left">
              <span class="featured-badge ${project.featured ? 'yes' : 'no'}">
                ${project.featured ? '⭐ Featured' : 'Not Featured'}
              </span>
            </div>
            <div class="proj-card-actions">
              <button class="btn btn-ghost btn-icon edit-btn" data-id="${project.id}" title="Edit">✎</button>
              <button class="btn btn-ghost btn-icon delete-btn" data-id="${project.id}" title="Delete">🗑</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click handlers to edit and delete buttons
    projectsList.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;
        this.editProject(id);
      });
    });

    projectsList.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;
        if (confirm('Are you sure you want to delete this project?')) {
          ProjectsDB.delete(id);
          this.loadProjects();
        }
      });
    });
  },

  /**
   * Open project modal for adding new project
   */
  openProjectModal() {
    this.currentEditingId = null;
    document.getElementById('modalTitle').textContent = 'Add New Project';
    document.getElementById('projectForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imageUploadArea').style.display = 'block';
    document.getElementById('projectImage').removeAttribute('data-image-data');
    document.getElementById('projectFeatured').checked = false;
    document.getElementById('projectOrder').value = '0';
    document.getElementById('projectModal').style.display = 'flex';
  },

  /**
   * Edit existing project
   */
  editProject(id) {
    const project = ProjectsDB.getById(id);
    if (!project) return;

    this.currentEditingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Project';
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectTag').value = project.tag || '';
    document.getElementById('projectDesc').value = project.description;
    document.getElementById('projectFeatured').checked = project.featured || false;
    document.getElementById('projectOrder').value = project.order || '0';

    // Show image preview
    document.getElementById('projectImage').dataset.imageData = project.image;
    const preview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    previewImg.src = project.image;
    preview.style.display = 'block';
    document.getElementById('imageUploadArea').style.display = 'none';

    document.getElementById('projectModal').style.display = 'flex';
  },

  /**
   * Close project modal
   */
  closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
    this.currentEditingId = null;
  },

  /**
   * Save/update project
   */
  saveProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const tag = document.getElementById('projectTag').value.trim();
    const description = document.getElementById('projectDesc').value.trim();
    const featured = document.getElementById('projectFeatured').checked;
    const order = parseInt(document.getElementById('projectOrder').value) || 0;
    const imageData = document.getElementById('projectImage').dataset.imageData;

    if (!title || !tag || !description || !imageData) {
      alert('Please fill in all required fields and upload an image');
      return;
    }

    const projectData = {
      title,
      tag,
      description,
      featured,
      order,
      image: imageData
    };

    if (this.currentEditingId) {
      // Update existing project
      ProjectsDB.update(this.currentEditingId, projectData);
    } else {
      // Add new project
      ProjectsDB.add(projectData);
    }

    this.closeProjectModal();
    this.loadProjects();
  },

  /**
   * Switch between sections
   */
  switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
      section.style.display = 'none';
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(`${sectionId}-section`);
    if (section) {
      section.style.display = 'block';
    }

    // Add active class to clicked nav link
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
  },

  /**
   * Export projects as JSON
   */
  exportProjects() {
    const projects = ProjectsDB.getAll();
    const dataStr = JSON.stringify(projects, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `projects-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AdminPanel.init();
});
