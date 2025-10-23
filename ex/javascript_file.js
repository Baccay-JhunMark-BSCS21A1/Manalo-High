// Global Variables
const students = [
    { id: 'ST001', name: 'Maria Garcia', grade: '9th Grade', section: 'A', status: 'Active' },
    { id: 'ST002', name: 'John Smith', grade: '10th Grade', section: 'B', status: 'Active' },
    { id: 'ST003', name: 'Sarah Johnson', grade: '11th Grade', section: 'A', status: 'Active' },
    { id: 'ST004', name: 'Michael Brown', grade: '9th Grade', section: 'C', status: 'Active' },
    { id: 'ST005', name: 'Emily Davis', grade: '12th Grade', section: 'A', status: 'Active' },
    { id: 'ST006', name: 'David Wilson', grade: '10th Grade', section: 'B', status: 'Active' },
    { id: 'ST007', name: 'Jessica Martinez', grade: '11th Grade', section: 'C', status: 'Active' },
    { id: 'ST008', name: 'Christopher Lee', grade: '9th Grade', section: 'A', status: 'Inactive' },
    { id: 'ST009', name: 'Amanda Taylor', grade: '12th Grade', section: 'B', status: 'Active' },
    { id: 'ST010', name: 'Matthew Anderson', grade: '10th Grade', section: 'A', status: 'Active' },
    { id: 'ST011', name: 'Maria Rodriguez', grade: '11th Grade', section: 'B', status: 'Active' },
    { id: 'ST012', name: 'James Thompson', grade: '9th Grade', section: 'C', status: 'Active' },
    { id: 'ST013', name: 'Lisa Chen', grade: '12th Grade', section: 'A', status: 'Active' },
    { id: 'ST014', name: 'Robert Garcia', grade: '10th Grade', section: 'C', status: 'Active' },
    { id: 'ST015', name: 'Ashley Williams', grade: '11th Grade', section: 'A', status: 'Active' },
    { id: 'ST016', name: 'Jhon Llyod Alonzo', grade: '9th Grade', section: 'B', status: 'Active' },
    { id: 'ST017', name: 'Jhun Mark Baccay', grade: '9th Grade', section: 'C', status: 'Active' },
    { id: 'ST018', name: 'Aaron Joseph Baldon', grade: '10th Grade', section: 'A', status: 'Active' },
    { id: 'ST019', name: 'Xavier Francis Cabalo', grade: '10th Grade', section: 'B', status: 'Active' },
    { id: 'ST020', name: 'Kristoffer Ryan Caoagdan', grade: '11th Grade', section: 'C', status: 'Active' },
    { id: 'ST021', name: 'Dennis Mark Coja', grade: '12th Grade', section: 'A', status: 'Active' },
    { id: 'ST022', name: 'Nicoley Gonio', grade: '9th Grade', section: 'A', status: 'Active' },
    { id: 'ST023', name: 'Christian Jasareno', grade: '10th Grade', section: 'C', status: 'Active' },
    { id: 'ST024', name: 'Paul Azel Marasigan', grade: '11th Grade', section: 'A', status: 'Active' },
    { id: 'ST025', name: 'Jhune Rey Magdurulan', grade: '12th Grade', section: 'B', status: 'Active' },
    { id: 'ST026', name: 'Vincent Lloyd Opiana', grade: '10th Grade', section: 'A', status: 'Active' },
    { id: 'ST027', name: 'Brave Jhon Osio', grade: '9th Grade', section: 'B', status: 'Active' },
    { id: 'ST028', name: 'Rayver Punzalan', grade: '11th Grade', section: 'B', status: 'Active' },
    { id: 'ST029', name: 'Karl Nathan Rosales', grade: '12th Grade', section: 'C', status: 'Active' },
    { id: 'ST030', name: 'Ivan Sambat', grade: '9th Grade', section: 'C', status: 'Active' },
    { id: 'ST031', name: 'Jan Paul Andre Victoria', grade: '10th Grade', section: 'B', status: 'Active' },
    { id: 'ST032', name: 'Blessed Monica Ydel', grade: '12th Grade', section: 'A', status: 'Active' },
    { id: 'ST033', name: 'Leo Marc Zozobrado', grade: '11th Grade', section: 'C', status: 'Active' }
];



const announcements = [
    "Enrollment is open until June 30!",
    "Parent-Teacher meeting on Friday!",
    "Science Fair next week - prepare your projects!",
    "Basketball tryouts start Monday!",
    "Library hours extended during exam week!",
    "New cafeteria menu available online!",
    "Winter break starts December 20th!"
];

let currentAnnouncementIndex = 0;
let filteredStudents = [...students];
let currentGradeFilter = 'all';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHomePage();
    initializeStudentsPage();
    initializeContactPage();
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Home Page Functions
function initializeHomePage() {
    const announcementText = document.getElementById('announcement-text');
    if (announcementText) {
        rotateAnnouncements();
    }
}

function rotateAnnouncements() {
    const announcementText = document.getElementById('announcement-text');
    
    setInterval(() => {
        currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;
        announcementText.style.opacity = '0';
        
        setTimeout(() => {
            announcementText.textContent = announcements[currentAnnouncementIndex];
            announcementText.style.opacity = '1';
        }, 250);
    }, 3000);
}

// Students Page Functions
function initializeStudentsPage() {
    const searchInput = document.getElementById('search-input');
    const studentsTable = document.getElementById('students-tbody');
    
    if (studentsTable) {
        displayStudents(students);
        updateStats();
    }

    if (searchInput) {
        // Real-time search as user types
        searchInput.addEventListener('input', function() {
            debounce(performSearch, 300)();
        });

        // Allow search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Debounce function for search optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function displayStudents(studentsToShow) {
    const tbody = document.getElementById('students-tbody');
    const noResults = document.getElementById('no-results');
    
    if (!tbody) return;
    
    if (studentsToShow.length === 0) {
        tbody.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
    } else {
        if (noResults) noResults.style.display = 'none';
        tbody.innerHTML = studentsToShow.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
                <td>${student.section}</td>
                <td><span class="status-${student.status.toLowerCase()}">${student.status}</span></td>
            </tr>
        `).join('');
    }
    
    filteredStudents = studentsToShow;
    updateStats();
}

function updateStats() {
    const totalStudentsEl = document.getElementById('total-students');
    const displayedStudentsEl = document.getElementById('displayed-students');
    
    if (totalStudentsEl) totalStudentsEl.textContent = students.length;
    if (displayedStudentsEl) displayedStudentsEl.textContent = filteredStudents.length;
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let studentsToFilter = students;
    
    // Apply grade filter first
    if (currentGradeFilter !== 'all') {
        studentsToFilter = students.filter(student => student.grade === currentGradeFilter);
    }
    
    // Then apply search filter
    if (searchTerm) {
        studentsToFilter = studentsToFilter.filter(student => 
            student.name.toLowerCase().includes(searchTerm) || 
            student.id.toLowerCase().includes(searchTerm) ||
            student.section.toLowerCase().includes(searchTerm)
        );
    }
    
    displayStudents(studentsToFilter);
}

function searchStudents() {
    performSearch();
}

function clearSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
        performSearch();
    }
}

function filterByGrade(grade) {
    currentGradeFilter = grade;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    performSearch();
}

// Contact Page Functions
function initializeContactPage() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate all fields
    isValid = validateName(name) && isValid;
    isValid = validateEmail(email) && isValid;
    isValid = validateSubject(subject) && isValid;
    isValid = validateMessage(message) && isValid;
    
    if (isValid) {
        submitForm();
    }
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    
    switch(fieldName) {
        case 'name':
            return validateName(value);
        case 'email':
            return validateEmail(value);
        case 'subject':
            return validateSubject(value);
        case 'message':
            return validateMessage(value);
        default:
            return true;
    }
}

function validateName(name) {
    const nameError = document.getElementById('name-error');
    if (!name) {
        showError('name-error', 'Name is required');
        return false;
    } else if (name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('name-error', 'Name can only contain letters and spaces');
        return false;
    }
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email-error', 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError('email-error', 'Please enter a valid email address');
        return false;
    }
    return true;
}

function validateSubject(subject) {
    if (!subject) {
        showError('subject-error', 'Please select a subject');
        return false;
    }
    return true;
}

function validateMessage(message) {
    if (!message) {
        showError('message-error', 'Message is required');
        return false;
    } else if (message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        return false;
    } else if (message.length > 1000) {
        showError('message-error', 'Message must be less than 1000 characters');
        return false;
    }
    return true;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearAllErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
}

function submitForm() {
    const submitBtn = document.querySelector('.submit-btn');
    const submitText = document.getElementById('submit-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMessage = document.getElementById('success-message');
    const contactForm = document.getElementById('contact-form');
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    loadingSpinner.style.display = 'block';
    
    // Simulate form submission with realistic delay
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Hide loading state
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        loadingSpinner.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 8 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 8000);
        
    }, 2000); // 2 second delay to simulate real form submission
}

// Utility Functions
function formatStudentId(id) {
    return id.toUpperCase();
}

function getGradeLevel(grade) {
    return grade.replace(' Grade', '');
}

function countStudentsByGrade() {
    const gradeCounts = {};
    students.forEach(student => {
        gradeCounts[student.grade] = (gradeCounts[student.grade] || 0) + 1;
    });
    return gradeCounts;
}

function getActiveStudentsCount() {
    return students.filter(student => student.status === 'Active').length;
}

// Advanced Search Functions
function searchByMultipleFields(searchTerm) {
    const term = searchTerm.toLowerCase();
    return students.filter(student => 
        student.name.toLowerCase().includes(term) || 
        student.id.toLowerCase().includes(term) ||
        student.grade.toLowerCase().includes(term) ||
        student.section.toLowerCase().includes(term)
    );
}

// Initialize page-specific functionality based on current page
function initializeCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'students.html':
            initializeStudentsPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
    }
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.7';
});

// Form enhancement functions
function setupFormEnhancements() {
    // Add character counter for message textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.textAlign = 'right';
        charCounter.style.fontSize = '0.875rem';
        charCounter.style.color = '#718096';
        charCounter.style.marginTop = '0.25rem';
        
        messageTextarea.parentNode.appendChild(charCounter);
        
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 1000;
            charCounter.textContent = `${currentLength}/${maxLength} characters`;
            
            if (currentLength > maxLength * 0.9) {
                charCounter.style.color = '#e53e3e';
            } else {
                charCounter.style.color = '#718096';
            }
        });
    }
}

// Enhanced error handling
function handleErrors(error) {
    console.error('An error occurred:', error);
    // You could implement user-friendly error notifications here
}

// Local storage functions (for browsers that support it)
function saveToLocalStorage(key, data) {
    try {
        if (typeof Storage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(data));
        }
    } catch (e) {
        // Local storage not available or quota exceeded
        console.log('Local storage not available');
    }
}

function loadFromLocalStorage(key) {
    try {
        if (typeof Storage !== 'undefined') {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        }
    } catch (e) {
        console.log('Error loading from local storage');
        return null;
    }
}

// Performance optimization
function optimizeTableRendering(students) {
    const tbody = document.getElementById('students-tbody');
    if (!tbody) return;
    
    // Use DocumentFragment for better performance with large datasets
    const fragment = document.createDocumentFragment();
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.section}</td>
            <td><span class="status-${student.status.toLowerCase()}">${student.status}</span></td>
        `;
        fragment.appendChild(row);
    });
    
    tbody.innerHTML = '';
    tbody.appendChild(fragment);
}

// Export functions for potential external use
window.SchoolSystem = {
    students,
    announcements,
    displayStudents,
    searchStudents,
    clearSearch,
    filterByGrade,
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};