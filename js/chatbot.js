class Chatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            greetings: [
                "Hi there! I'm here to help you learn more about my portfolio. What would you like to know?",
                "Hello! Feel free to ask me about my Java skills, backend projects, or experience.",
                "Hey! I'm excited to chat with you about my work as a Java backend developer."
            ],
            skills: [
                "My core stack is Java with Spring Boot — I build RESTful APIs, work with Hibernate/JPA for database access, and secure applications with Spring Security.",
                "I'm proficient in Java, Spring Boot, Spring MVC, MySQL, and PostgreSQL. I'm also comfortable with Docker and AWS for deployment.",
                "Backend engineering is my focus — Java, Spring Boot, REST API design, relational databases, and I'm actively developing skills in microservices and cloud-native deployment."
            ],
            projects: [
                "I've built a Spring Boot marketplace API with JWT auth, a Java-based speech transcription service integrating AssemblyAI, and the official SCMS college portal.",
                "My featured projects demonstrate backend skills — REST APIs, service integration, database design with MySQL, and clean architecture principles.",
                "Check out my projects section! The Wanderlust marketplace and VoiceScribe service both showcase Spring Boot and Java REST API development."
            ],
            experience: [
                "I'm a final year B.Tech student focused on Java backend development. I've been building real projects with Spring Boot and pushing my understanding of system design.",
                "As a B.Tech 4th year student, I've invested heavily in backend engineering — APIs, databases, authentication, and deployment. I'm ready to bring that to a professional environment.",
                "I believe in learning by building. My projects reflect a genuine interest in how backend systems are designed, structured, and deployed at scale."
            ],
            devops: [
                "I use Docker to containerize my Spring Boot applications and I'm exploring AWS for cloud deployment and EC2/S3 usage.",
                "DevOps is an important part of the backend story — I'm working with Docker, understanding CI/CD pipelines, and getting comfortable with AWS basics.",
                "My DevOps interest centers on making Java applications production-ready — containerization with Docker, automated builds, and cloud hosting on AWS."
            ],
            java: [
                "Java is my primary language. I work with core Java concepts — OOP, collections, exception handling — and build on that with Spring Boot for production-grade APIs.",
                "I love Java for its reliability and ecosystem. Spring Boot in particular makes it fast to build and deploy robust backend services.",
                "From core Java to Spring Boot to Hibernate — the Java ecosystem is deep, and I enjoy working across all of it to build clean, maintainable backend code."
            ],
            learning: [
                "Right now I'm going deeper on Spring Boot microservices, learning about API gateway patterns, and building out my knowledge of system design.",
                "I stay current by building projects, reading official Spring documentation, and exploring topics like distributed systems and database optimization.",
                "I'm always learning — currently focused on Java advanced patterns, Spring Security best practices, and container orchestration concepts."
            ],
            contact: [
                "I'd love to connect! Use the contact form below, or find me on LinkedIn and GitHub through the social links.",
                "Feel free to reach out through the contact section — I'm always open to discussing backend roles, collaborations, or interesting projects.",
                "Let's connect! The contact form is the quickest way, or find me on LinkedIn and GitHub via the social links."
            ],
            default: [
                "That's an interesting question! Feel free to ask me about my Java skills, Spring Boot projects, backend experience, or anything else on my portfolio.",
                "I'd be happy to help! You can ask about my technical skills, projects I've built, my learning journey, or ways to get in touch.",
                "Good question! I can tell you about my Java backend experience, Spring Boot projects, DevOps interests, or anything else you'd like to know."
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
        
        if (this.containsAny(lowerMessage, ['skill', 'technology', 'tech', 'programming', 'coding', 'stack'])) {
            return this.getRandomResponse('skills');
        }
        
        if (this.containsAny(lowerMessage, ['project', 'work', 'portfolio', 'built', 'created', 'app'])) {
            return this.getRandomResponse('projects');
        }
        
        if (this.containsAny(lowerMessage, ['experience', 'background', 'journey', 'career', 'student'])) {
            return this.getRandomResponse('experience');
        }
        
        if (this.containsAny(lowerMessage, ['java', 'spring', 'spring boot', 'hibernate', 'jpa', 'backend'])) {
            return this.getRandomResponse('java');
        }
        
        if (this.containsAny(lowerMessage, ['devops', 'docker', 'aws', 'cloud', 'deployment', 'ci/cd', 'container'])) {
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