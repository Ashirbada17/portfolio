class Chatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            greetings: [
                "Hi there! I'm here to help you learn more about my portfolio. What would you like to know?",
                "Hello! Feel free to ask me about my skills, projects, or experience.",
                "Hey! I'm excited to chat with you about my work and background."
            ],
            skills: [
                "I specialize in the MERN stack - MongoDB, Express.js, React.js, and Node.js. I'm also passionate about DevOps technologies like Docker, AWS, and CI/CD pipelines.",
                "My technical skills include JavaScript, React, Node.js, MongoDB, and I'm actively learning DevOps tools like Docker and AWS cloud services.",
                "I'm proficient in full-stack JavaScript development with React and Node.js, plus I have growing expertise in DevOps practices and cloud technologies."
            ],
            projects: [
                "I've worked on several projects including an e-commerce MERN application, a task management system with real-time features, and a DevOps monitoring dashboard.",
                "My featured projects showcase full-stack development skills - from e-commerce platforms to collaborative tools and monitoring dashboards.",
                "I love building end-to-end applications. Check out my projects section to see my e-commerce app, task manager, and DevOps dashboard!"
            ],
            experience: [
                "I'm currently a B.Tech 4th year student with a focus on practical learning. While I may be early in my professional journey, I bring fresh perspectives and strong problem-solving skills.",
                "As a final year B.Tech student, I've been building projects and learning industry-relevant technologies. I'm eager to apply my skills in a professional environment.",
                "I'm a passionate student developer who believes in learning by doing. My academic projects and personal work reflect my commitment to continuous growth."
            ],
            devops: [
                "I'm really interested in DevOps! I've been learning Docker for containerization, exploring AWS cloud services, and understanding CI/CD pipeline concepts.",
                "DevOps fascinates me because it bridges development and operations. I'm currently exploring containerization, cloud deployment, and automation tools.",
                "My DevOps journey includes learning Docker, AWS basics, and automation practices. It's an area I'm passionate about and actively developing skills in."
            ],
            learning: [
                "I believe in continuous learning! I'm always exploring new technologies, taking online courses, and building projects to improve my skills.",
                "Learning is my passion. I stay updated with the latest tech trends through courses, documentation, and hands-on projects.",
                "I love learning new technologies! Currently focusing on advanced React patterns, Node.js best practices, and DevOps tools."
            ],
            contact: [
                "I'd love to connect! You can reach me through the contact form below, or check out my social links for LinkedIn and GitHub.",
                "Feel free to get in touch through the contact section! I'm always open to discussing opportunities and collaborations.",
                "Let's connect! Use the contact form to reach out, or find me on LinkedIn and GitHub through the social links."
            ],
            default: [
                "That's an interesting question! Feel free to ask me about my skills, projects, experience, or anything related to my portfolio.",
                "I'd be happy to help! You can ask me about my technical skills, projects I've worked on, or my learning journey.",
                "Great question! I can tell you about my MERN stack experience, DevOps interests, projects, or anything else you'd like to know."
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const toggle = document.querySelector('.chatbot-toggle');
        const close = document.querySelector('.chatbot-close');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');
        
        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        send.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.querySelector('.chatbot-container');
        const toggle = document.querySelector('.chatbot-toggle');
        
        if (this.isOpen) {
            container.classList.add('active');
            toggle.style.transform = 'scale(0.9)';
            this.addTypingAnimation();
        } else {
            container.classList.remove('active');
            toggle.style.transform = 'scale(1)';
        }
    }
    
    closeChat() {
        this.isOpen = false;
        const container = document.querySelector('.chatbot-container');
        const toggle = document.querySelector('.chatbot-toggle');
        
        container.classList.remove('active');
        toggle.style.transform = 'scale(1)';
    }
    
    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate thinking time
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }
    
    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Auto scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add typing dots animation
        const style = document.createElement('style');
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }
            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--primary-color);
                animation: typing-bounce 1.4s infinite ease-in-out;
            }
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            
            @keyframes typing-bounce {
                0%, 80%, 100% {
                    transform: scale(0);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        
        if (!document.querySelector('#typing-style')) {
            style.id = 'typing-style';
            document.head.appendChild(style);
        }
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific keywords
        if (this.containsAny(lowerMessage, ['hi', 'hello', 'hey', 'greetings'])) {
            return this.getRandomResponse('greetings');
        }
        
        if (this.containsAny(lowerMessage, ['skill', 'technology', 'tech', 'programming', 'coding'])) {
            return this.getRandomResponse('skills');
        }
        
        if (this.containsAny(lowerMessage, ['project', 'work', 'portfolio', 'built', 'created'])) {
            return this.getRandomResponse('projects');
        }
        
        if (this.containsAny(lowerMessage, ['experience', 'background', 'journey', 'career'])) {
            return this.getRandomResponse('experience');
        }
        
        if (this.containsAny(lowerMessage, ['devops', 'docker', 'aws', 'cloud', 'deployment', 'ci/cd'])) {
            return this.getRandomResponse('devops');
        }
        
        if (this.containsAny(lowerMessage, ['learn', 'learning', 'study', 'education'])) {
            return this.getRandomResponse('learning');
        }
        
        if (this.containsAny(lowerMessage, ['contact', 'reach', 'connect', 'email', 'phone'])) {
            return this.getRandomResponse('contact');
        }
        
        return this.getRandomResponse('default');
    }
    
    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    addTypingAnimation() {
        // Add welcome message with typing effect if first time opening
        const messages = document.getElementById('chatbot-messages');
        if (messages.children.length <= 1) {
            setTimeout(() => {
                this.addMessage("How can I help you today? 😊", 'bot');
            }, 500);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});