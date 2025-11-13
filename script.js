// Copy code functionality
function copyCode(button) {
    const codeBlock = button.parentElement.nextElementSibling;
    const code = codeBlock.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
        // Visual feedback
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '#334155';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        button.textContent = 'Error';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active state to navigation links based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === 'index.html' && linkHref === '#home')) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '600';
        }
    });
});

