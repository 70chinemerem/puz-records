/**
 * Authentication JavaScript
 * Handles registration, login, and authentication state management
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggle();
  initPasswordStrength();
  initFormValidation();
  initRegisterForm();
  initLoginForm();
  checkAuthState();
});

/**
 * Initialize password visibility toggle
 */
function initPasswordToggle() {
  // Register page password toggles
  const toggleRegisterPassword = document.getElementById('toggle-register-password');
  const registerPassword = document.getElementById('register-password');
  const eyeIconRegister = document.getElementById('eye-icon-register');
  const eyeOffIconRegister = document.getElementById('eye-off-icon-register');
  
  if (toggleRegisterPassword && registerPassword) {
    toggleRegisterPassword.addEventListener('click', () => {
      const type = registerPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      registerPassword.setAttribute('type', type);
      
      if (eyeIconRegister && eyeOffIconRegister) {
        eyeIconRegister.classList.toggle('hidden');
        eyeOffIconRegister.classList.toggle('hidden');
      }
    });
  }
  
  // Confirm password toggle
  const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
  const confirmPassword = document.getElementById('confirm-password');
  const eyeIconConfirm = document.getElementById('eye-icon-confirm');
  const eyeOffIconConfirm = document.getElementById('eye-off-icon-confirm');
  
  if (toggleConfirmPassword && confirmPassword) {
    toggleConfirmPassword.addEventListener('click', () => {
      const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPassword.setAttribute('type', type);
      
      if (eyeIconConfirm && eyeOffIconConfirm) {
        eyeIconConfirm.classList.toggle('hidden');
        eyeOffIconConfirm.classList.toggle('hidden');
      }
    });
  }
  
  // Login page password toggle
  const toggleLoginPassword = document.getElementById('toggle-login-password');
  const loginPassword = document.getElementById('login-password');
  const eyeIconLogin = document.getElementById('eye-icon-login');
  const eyeOffIconLogin = document.getElementById('eye-off-icon-login');
  
  if (toggleLoginPassword && loginPassword) {
    toggleLoginPassword.addEventListener('click', () => {
      const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      loginPassword.setAttribute('type', type);
      
      if (eyeIconLogin && eyeOffIconLogin) {
        eyeIconLogin.classList.toggle('hidden');
        eyeOffIconLogin.classList.toggle('hidden');
      }
    });
  }
}

/**
 * Initialize password strength indicator
 */
function initPasswordStrength() {
  const passwordInput = document.getElementById('register-password');
  const strengthDiv = document.getElementById('password-strength');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');
  
  if (passwordInput && strengthDiv && strengthBar && strengthText) {
    passwordInput.addEventListener('input', (e) => {
      const password = e.target.value;
      
      if (password.length === 0) {
        strengthDiv.classList.add('hidden');
        return;
      }
      
      strengthDiv.classList.remove('hidden');
      
      // Calculate password strength
      let strength = 0;
      let feedback = [];
      
      if (password.length >= 8) strength += 1;
      else feedback.push('at least 8 characters');
      
      if (/[a-z]/.test(password)) strength += 1;
      else feedback.push('lowercase letter');
      
      if (/[A-Z]/.test(password)) strength += 1;
      else feedback.push('uppercase letter');
      
      if (/[0-9]/.test(password)) strength += 1;
      else feedback.push('number');
      
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      else feedback.push('special character');
      
      // Update strength bar
      const percentage = (strength / 5) * 100;
      strengthBar.style.width = `${percentage}%`;
      
      // Update colors and text
      if (strength <= 2) {
        strengthBar.className = 'h-full transition-all duration-300 bg-red-500';
        strengthText.textContent = 'Weak password';
        strengthText.className = 'text-xs text-red-400';
      } else if (strength <= 3) {
        strengthBar.className = 'h-full transition-all duration-300 bg-yellow-500';
        strengthText.textContent = 'Medium password';
        strengthText.className = 'text-xs text-yellow-400';
      } else if (strength <= 4) {
        strengthBar.className = 'h-full transition-all duration-300 bg-blue-500';
        strengthText.textContent = 'Good password';
        strengthText.className = 'text-xs text-blue-400';
      } else {
        strengthBar.className = 'h-full transition-all duration-300 bg-green-500';
        strengthText.textContent = 'Strong password';
        strengthText.className = 'text-xs text-green-400';
      }
    });
  }
}

/**
 * Initialize form validation with real-time feedback
 */
function initFormValidation() {
  // Register form validation
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    // Full name validation
    if (fullNameInput) {
      fullNameInput.addEventListener('blur', () => {
        const errorEl = document.getElementById('full-name-error');
        if (fullNameInput.value.length < 2) {
          showFieldError(errorEl, 'Name must be at least 2 characters');
          fullNameInput.classList.add('border-red-500');
        } else {
          clearFieldError(errorEl);
          fullNameInput.classList.remove('border-red-500');
        }
      });
    }
    
    // Email validation
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const errorEl = document.getElementById('register-email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          showFieldError(errorEl, 'Please enter a valid email address');
          emailInput.classList.add('border-red-500');
        } else {
          clearFieldError(errorEl);
          emailInput.classList.remove('border-red-500');
        }
      });
    }
    
    // Confirm password match validation
    if (confirmPasswordInput && passwordInput) {
      confirmPasswordInput.addEventListener('input', () => {
        const matchEl = document.getElementById('confirm-password-match');
        if (confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value) {
          matchEl.textContent = 'Passwords do not match';
          matchEl.className = 'text-xs mt-1 text-red-400';
          matchEl.classList.remove('hidden');
          confirmPasswordInput.classList.add('border-red-500');
        } else if (confirmPasswordInput.value && confirmPasswordInput.value === passwordInput.value) {
          matchEl.textContent = 'Passwords match';
          matchEl.className = 'text-xs mt-1 text-green-400';
          matchEl.classList.remove('hidden');
          confirmPasswordInput.classList.remove('border-red-500');
          confirmPasswordInput.classList.add('border-green-500');
        } else {
          matchEl.classList.add('hidden');
          confirmPasswordInput.classList.remove('border-red-500', 'border-green-500');
        }
      });
      
      passwordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value) {
          confirmPasswordInput.dispatchEvent(new Event('input'));
        }
      });
    }
  }
  
  // Login form validation
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const errorEl = document.getElementById('login-email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          showFieldError(errorEl, 'Please enter a valid email address');
          emailInput.classList.add('border-red-500');
        } else {
          clearFieldError(errorEl);
          emailInput.classList.remove('border-red-500');
        }
      });
    }
  }
}

/**
 * Show field error message
 */
function showFieldError(errorEl, message) {
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
}

/**
 * Clear field error message
 */
function clearFieldError(errorEl) {
  if (errorEl) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
  }
}

/**
 * Initialize registration form
 */
function initRegisterForm() {
  const registerForm = document.getElementById('register-form');
  const errorDiv = document.getElementById('register-error');
  const successDiv = document.getElementById('register-success');
  
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(registerForm);
      const fullName = formData.get('fullName');
      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');
      const terms = formData.get('terms');
      
      // Hide previous messages
      if (errorDiv) errorDiv.classList.add('hidden');
      if (successDiv) successDiv.classList.add('hidden');
      
      // Validation
      if (password !== confirmPassword) {
        showError(errorDiv, 'Passwords do not match');
        return;
      }
      
      if (password.length < 8) {
        showError(errorDiv, 'Password must be at least 8 characters');
        return;
      }
      
      if (!terms) {
        showError(errorDiv, 'Please accept the terms and conditions');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError(errorDiv, 'Please enter a valid email address');
        return;
      }
      
      // Show loading state
      const submitButton = document.getElementById('register-submit-btn');
      const btnText = document.getElementById('register-btn-text');
      const btnLoading = document.getElementById('register-btn-loading');
      
      if (submitButton) {
        submitButton.disabled = true;
        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');
      }
      
      try {
        // In production, replace this with actual API call
        // const response = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ fullName, email, password })
        // });
        // const data = await response.json();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, we'll store user data in localStorage
        const userData = {
          fullName,
          email,
          createdAt: new Date().toISOString()
        };
        
        // Store user data (in production, this would be handled by the backend)
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Show success message
        if (successDiv) {
          successDiv.querySelector('p').textContent = 'Account created successfully! Redirecting...';
          successDiv.classList.remove('hidden');
        }
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
        
      } catch (error) {
        showError(errorDiv, 'Registration failed. Please try again.');
        if (submitButton) {
          submitButton.disabled = false;
          if (btnText) btnText.classList.remove('hidden');
          if (btnLoading) btnLoading.classList.add('hidden');
        }
      }
    });
  }
}

/**
 * Initialize login form
 */
function initLoginForm() {
  const loginForm = document.getElementById('login-form');
  const errorDiv = document.getElementById('login-error');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(loginForm);
      const email = formData.get('email');
      const password = formData.get('password');
      const rememberMe = formData.get('rememberMe');
      
      // Hide previous error
      if (errorDiv) errorDiv.classList.add('hidden');
      
      // Show loading state
      const submitButton = document.getElementById('login-submit-btn');
      const btnText = document.getElementById('login-btn-text');
      const btnLoading = document.getElementById('login-btn-loading');
      
      if (submitButton) {
        submitButton.disabled = true;
        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');
      }
      
      try {
        // In production, replace this with actual API call
        // const response = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password })
        // });
        // const data = await response.json();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, check if user exists in localStorage
        // In production, this would be handled by the backend
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // In a real app, you would verify the password with the backend
          // For demo, we'll just check if email matches
          if (userData.email === email) {
            // Set authentication state
            localStorage.setItem('isAuthenticated', 'true');
            
            // Store remember me preference
            if (rememberMe) {
              localStorage.setItem('rememberMe', 'true');
            }
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
          } else {
            throw new Error('Invalid credentials');
          }
        } else {
          // For demo: create a default user if none exists
          const defaultUser = {
            fullName: 'John Doe',
            email: email,
            createdAt: new Date().toISOString()
          };
          localStorage.setItem('user', JSON.stringify(defaultUser));
          localStorage.setItem('isAuthenticated', 'true');
          
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          
          window.location.href = 'dashboard.html';
        }
        
      } catch (error) {
        showError(errorDiv, 'Invalid email or password. Please try again.');
        if (submitButton) {
          submitButton.disabled = false;
          if (btnText) btnText.classList.remove('hidden');
          if (btnLoading) btnLoading.classList.add('hidden');
        }
      }
    });
  }
}

/**
 * Check authentication state and redirect if needed
 */
function checkAuthState() {
  // If user is already authenticated and on login/register page, redirect to dashboard
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const currentPage = window.location.pathname;
  
  if (isAuthenticated && (currentPage.includes('login.html') || currentPage.includes('register.html'))) {
    // Optionally redirect to dashboard
    // window.location.href = 'dashboard.html';
  }
  
  // If user is not authenticated and on dashboard, redirect to login
  if (!isAuthenticated && currentPage.includes('dashboard.html')) {
    window.location.href = 'login.html';
  }
}

/**
 * Show error message
 */
function showError(errorDiv, message) {
  if (errorDiv) {
    errorDiv.querySelector('p').textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Logout function (can be called from dashboard)
 */
export function logout() {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('rememberMe');
  // Optionally remove user data
  // localStorage.removeItem('user');
  window.location.href = 'login.html';
}

/**
 * Get current user data
 */
export function getCurrentUser() {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true';
}

