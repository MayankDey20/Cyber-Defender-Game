document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let currentLevel = 1;
    let currentScenarioIndex = 0;
    let score = 0;
    let totalScenarios = 0;
    let scenarios = [];

    // DOM elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startGameButton = document.getElementById('start-game');
    const nextButton = document.getElementById('next-button');
    const playAgainButton = document.getElementById('play-again');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');
    const scenarioContainer = document.getElementById('scenario-container');
    const interactionArea = document.getElementById('interaction-area');
    const feedbackArea = document.getElementById('feedback-area');
    const progressBar = document.getElementById('progress-bar');
    const currentLevelElement = document.getElementById('current-level');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const performanceMessage = document.getElementById('performance-message');

    // Game scenarios definition
    function initializeScenarios() {
        scenarios = [
            // Level 1: Basic Phishing
            {
                level: 1,
                title: "Suspicious Email",
                description: "You received this email. Is there anything suspicious?",
                content: `
                    <div class="email-interface">
                        <div class="email-header bg-gray-100 p-4">
                            <div><strong>From:</strong> amazonsecurity@amazon-secure-verify.com</div>
                            <div><strong>To:</strong> you@email.com</div>
                            <div><strong>Subject:</strong> URGENT: Your Amazon account has been compromised</div>
                        </div>
                        <div class="p-4">
                            <div class="mb-4">
                                <p>Dear Valued Customer,</p>
                                <p class="my-2">We have detected suspicious activity on your Amazon account. Your account has been temporarily limited until we can verify your information.</p>
                                <p class="my-2">Please <a href="#" class="text-blue-600 underline clickable" data-threat="phishing-link">click here to verify your account</a> information immediately to restore full access to your account.</p>
                                <p class="my-2">Failure to verify your information within 24 hours will result in permanent account suspension.</p>
                                <p class="mt-4">Regards,<br>Amazon Security Team</p>
                            </div>
                        </div>
                    </div>
                `,
                type: "click",
                threats: ["phishing-link"],
                options: null,
                feedback: {
                    correct: "Good job! This is a phishing attempt. The suspicious elements include: <ul class='list-disc ml-6 mt-2'><li>The sender email is from 'amazon-secure-verify.com' not amazon.com</li><li>The urgent tone creating pressure to act quickly</li><li>The threat of account suspension</li><li>The generic greeting 'Valued Customer' instead of your name</li></ul>",
                    incorrect: "You missed the phishing attempt. Look carefully at the sender's email address (not from amazon.com) and the urgent language designed to make you panic and click without thinking."
                }
            },
            {
                level: 1,
                title: "Password Strength",
                description: "Which of these passwords is the strongest?",
                content: `
                    <div class="p-4 bg-gray-100 rounded-lg">
                        <h3 class="text-lg font-medium mb-4">Select the strongest password from the options below:</h3>
                    </div>
                `,
                type: "choice",
                threats: null,
                options: [
                    { text: "password123", isCorrect: false },
                    { text: "Fluffy2010", isCorrect: false },
                    { text: "j4K&9p!2xL@7", isCorrect: true },
                    { text: "welcome1", isCorrect: false }
                ],
                feedback: {
                    correct: "Correct! 'j4K&9p!2xL@7' is the strongest password because it contains a mix of uppercase and lowercase letters, numbers, special characters, and is sufficiently long.",
                    incorrect: "The strongest password is 'j4K&9p!2xL@7'. Strong passwords should contain a mix of uppercase and lowercase letters, numbers, special characters, and be at least 12 characters long."
                }
            },
            {
                level: 1,
                title: "Suspicious Website",
                description: "You're trying to log in to your bank account. Is there something wrong with this website?",
                content: `
                    <div class="browser-frame">
                        <div class="browser-header">
                            <div class="browser-controls">
                                <div class="browser-circle circle-red"></div>
                                <div class="browser-circle circle-yellow"></div>
                                <div class="browser-circle circle-green"></div>
                            </div>
                            <div class="browser-address clickable" data-threat="insecure-url">http://bankofamerica-secure.com/login</div>
                        </div>
                        <div class="browser-content">
                            <div class="flex justify-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Bank_of_America_logo.svg/200px-Bank_of_America_logo.svg.png" alt="Bank Logo" width="180">
                            </div>
                            <div class="mt-6 p-4 max-w-sm mx-auto">
                                <h3 class="text-xl font-bold mb-4 text-center">Sign In to Online Banking</h3>
                                <div class="mb-4">
                                    <label class="block text-gray-700 mb-1">Online ID</label>
                                    <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter Online ID">
                                    </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 mb-1">Password</label>
                                    <input type="password" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter Password">
                                </div>
                                <button class="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
                            </div>
                        </div>
                    </div>
                `,
                type: "click",
                threats: ["insecure-url"],
                options: null,
                feedback: {
                    correct: "Excellent! You identified a potential phishing site. The issues include: <ul class='list-disc ml-6 mt-2'><li>The URL is 'http://' (not HTTPS), meaning the connection is not encrypted</li><li>The domain 'bankofamerica-secure.com' is not the official Bank of America domain</li><li>Legitimate banks always use secure connections (https://)</li></ul>",
                    incorrect: "You missed the security issue. The URL uses 'http://' instead of 'https://' (no encryption) and the domain 'bankofamerica-secure.com' is not the official Bank of America domain."
                }
            },

            // Level 2: More Complex Scenarios
            {
                level: 2,
                title: "Social Media Request",
                description: "You received this message on social media. Identify any potential threats:",
                content: `
                    <div class="phone-interface p-4">
                        <div class="flex items-center mb-4 pb-2 border-b border-gray-200">
                            <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                                <i class="fas fa-user text-gray-500"></i>
                            </div>
                            <div>
                                <div class="font-semibold">John Smith</div>
                                <div class="text-xs text-gray-500">Sent 10 minutes ago</div>
                            </div>
                        </div>
                        <div class="p-2">
                            <p class="mb-3">Hey there! I'm a recruiter for a major tech company and noticed your profile. We're looking for talented people like you!</p>
                            <p class="mb-3">I'd like to discuss an amazing job opportunity with a starting salary of $150,000. <span class="clickable" data-threat="personal-info">Please send me your resume, address, and date of birth so I can start the application process right away.</span></p>
                            <p class="mb-3">Also, <span class="clickable" data-threat="suspicious-link">check out our company benefits here</span>. You'll need to log in with your current work email and password to access it.</p>
                            <p>Looking forward to working with you!</p>
                        </div>
                    </div>
                `,
                type: "click",
                threats: ["personal-info", "suspicious-link"],
                options: null,
                feedback: {
                    correct: "Great job! You identified the social engineering attempt. This message has multiple red flags: <ul class='list-disc ml-6 mt-2'><li>Requesting personal information (address, date of birth) through a social media message</li><li>Asking you to use your current work credentials on an external site</li><li>Offering an unusually high salary without an interview</li><li>Creating urgency to bypass your normal caution</li></ul>",
                    incorrect: "You missed some red flags. The message asks for sensitive personal information and tries to get you to enter your work credentials on an external site - both classic social engineering techniques."
                }
            },
            {
                level: 2,
                title: "Software Update Popup",
                description: "This popup appeared while Browsing. What should you do?",
                content: `
                    <div class="browser-interface p-4">
                        <div class="max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
                            <div class="flex items-center mb-3">
                                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-exclamation-triangle text-white"></i>
                                </div>
                                <div class="font-bold text-lg">WARNING: Adobe Flash Update Required</div>
                            </div>
                            <div class="border-t border-b border-gray-200 py-3 my-3">
                                <p>Your Adobe Flash Player is outdated and needs to be updated immediately for security reasons.</p>
                                <p class="mt-2 font-semibold">Click the button below to update now:</p>
                            </div>
                            <div class="flex justify-center mt-4">
                                <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 clickable" data-threat="fake-update">Download Update Now</button>
                            </div>
                            <div class="text-xs text-center mt-3 text-gray-500">
                                Flash_Update_v11.3.300.exe | 2.4MB
                            </div>
                        </div>
                    </div>
                `,
                type: "choice",
                threats: null,
                options: [
                    { text: "Click 'Download Update Now' to update Flash", isCorrect: false },
                    { text: "Close the popup and update Flash through Adobe's official website", isCorrect: true },
                    { text: "Enter your admin password to allow the update", isCorrect: false },
                    { text: "Click the popup to see more information", isCorrect: false }
                ],
                feedback: {
                    correct: "Correct! This is a fake update popup. Adobe Flash has been discontinued since December 2020, and legitimate updates come through official channels, not browser popups. Always download software updates directly from the vendor's official website.",
                    incorrect: "This is actually a fake update popup. Adobe Flash has been discontinued since December 2020. These popups often contain malware. Always get software updates directly from the official source, not from popups."
                }
            },
            {
                level: 2,
                title: "Public Wi-Fi Usage",
                description: "You're at a coffee shop and need to access your bank account. What's the safest approach?",
                content: `
                    <div class="p-4 bg-gray-100 rounded-lg">
                        <div class="mb-4">
                            <i class="fas fa-wifi text-3xl text-blue-500"></i>
                            <h3 class="text-lg font-medium mt-2">Available Networks:</h3>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-wifi mr-2 text-green-500"></i>
                                    <span>CoffeeShop_FREE</span>
                                    <span class="ml-2 text-sm text-gray-500">(Unsecured)</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-wifi mr-2 text-green-500"></i>
                                    <span>CoffeeShop_Guest</span>
                                    <span class="ml-2 text-sm text-gray-500">(Password protected)</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-wifi mr-2 text-green-500"></i>
                                    <span>FREE_WiFi_Hotspot</span>
                                    <span class="ml-2 text-sm text-gray-500">(Unsecured)</span>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-4">
                            <h3 class="font-medium">You need to check your bank balance and transfer money to a friend.</h3>
                        </div>
                    </div>
                `,
                type: "choice",
                threats: null,
                options: [
                    { text: "Connect to CoffeeShop_FREE and access your bank's website", isCorrect: false },
                    { text: "Connect to CoffeeShop_Guest with the password and access your bank", isCorrect: false },
                    { text: "Use your phone's cellular data instead of Wi-Fi", isCorrect: true },
                    { text: "Connect to FREE_WiFi_Hotspot since it has the strongest signal", isCorrect: false }
                ],
                feedback: {
                    correct: "Correct! Using cellular data is the safest option when accessing sensitive accounts in public. Public Wi-Fi networks, even password-protected ones, can be monitored by attackers. If you must use public Wi-Fi for sensitive transactions, always use a VPN.",
                    incorrect: "The safest option is using your cellular data. Public Wi-Fi networks (even password-protected ones) are vulnerable to monitoring and man-in-the-middle attacks. Always use cellular data or a VPN for sensitive transactions like banking."
                }
            },

            // Level 3: Advanced Threats
            {
                level: 3,
                title: "Business Email Compromise",
                description: "You work in accounting and received this email. Identify any suspicious elements:",
                content: `
                    <div class="email-interface">
                        <div class="email-header bg-gray-100 p-4">
                            <div><strong>From:</strong> ceo@company-international.com</div>
                            <div><strong>To:</strong> accounting@yourcompany.com</div>
                            <div><strong>Subject:</strong> Urgent Wire Transfer Needed</div>
                            <div><strong>Date:</strong> Today, 9:15 AM</div>
                        </div>
                        <div class="p-4">
                            <div class="mb-4">
                                <p>Hello,</p>
                                <p class="my-2">I'm currently in a meeting with a potential business partner <span class="clickable" data-threat="urgency">and need a wire transfer processed immediately</span> to secure our new deal.</p>
                                <p class="my-2"><span class="clickable" data-threat="unusual-request">Please transfer $24,950 to the following account:</span></p>
                                <p class="my-2">
                                    Bank: First International Bank<br>
                                    Account Number: 789654123<br>
                                    Routing Number: 021000089<br>
                                    Account Name: Business Ventures LLC
                                </p>
                                <p class="my-2"><span class="clickable" data-threat="secrecy">Keep this confidential and don't discuss this with anyone else in the office as the deal is not public yet.</span> <span class="clickable" data-threat="no-verification">I'll explain everything when I return.</span></p>
                                <p class="my-2">Please confirm once the transfer is complete.</p>
                                <p class="mt-4">Thanks,<br>James Wilson<br>CEO</p>
                            </div>
                        </div>
                    </div>
                `,
                type: "click",
                threats: ["urgency", "unusual-request", "secrecy", "no-verification"],
                options: null,
                feedback: {
                    correct: "Excellent detection! This is a business email compromise (BEC) attack with multiple red flags: <ul class='list-disc ml-6 mt-2'><li>The domain 'company-international.com' is likely not your CEO's actual email domain</li><li>Creates urgency to pressure quick action</li><li>Requests an unusual financial transaction</li><li>Asks for secrecy and no verification with others</li><li>The amount ($24,950) is just under $25,000, which might be your company's threshold for additional approval</li></ul>",
                    incorrect: "This email shows multiple signs of a business email compromise (BEC) attack, including urgency, unusual financial requests, demands for secrecy, and instructions to avoid normal verification procedures. The sender email domain is also suspicious."
                }
            },
            {
                level: 3,
                title: "Multi-Factor Authentication",
                description: "Which of these is the most secure form of multi-factor authentication (MFA)?",
                content: `
                    <div class="p-4 bg-gray-100 rounded-lg">
                        <h3 class="text-lg font-medium mb-4">Select the most secure form of multi-factor authentication:</h3>
                    </div>
                `,
                type: "choice",
                threats: null,
                options: [
                    { text: "Password + Security Questions", isCorrect: false },
                    { text: "Password + SMS Code", isCorrect: false },
                    { text: "Password + Email Code", isCorrect: false },
                    { text: "Password + Hardware Security Key", isCorrect: true }
                ],
                feedback: {
                    correct: "Correct! A hardware security key combined with a password provides the strongest multi-factor authentication. Hardware keys are resistant to phishing and remote interception, unlike SMS codes which can be intercepted or email codes which can be compromised if your email account is hacked.",
                    incorrect: "The most secure option is 'Password + Hardware Security Key'. Hardware keys are resistant to phishing attacks and can't be remotely intercepted like SMS codes can be. Security questions and email codes are also vulnerable if your accounts are compromised."
                }
            },
            {
                level: 3,
                title: "Suspicious File Attachment",
                description: "You received this email with an attachment. What should you do?",
                content: `
                    <div class="email-interface">
                        <div class="email-header bg-gray-100 p-4">
                            <div><strong>From:</strong> billing@netflixsupport.com</div>
                            <div><strong>To:</strong> you@email.com</div>
                            <div><strong>Subject:</strong> Your Netflix Invoice #INV-29581</div>
                            <div><strong>Attachments:</strong> <span class="clickable" data-threat="suspicious-file">Netflix_Invoice_29581.exe</span></div>
                        </div>
                        <div class="p-4">
                            <div class="mb-4">
                                <p>Dear Customer,</p>
                                <p class="my-2">Please find attached your Netflix invoice for the current billing period.</p>
                                <p class="my-2">If you have any questions regarding your bill, please open the attached file for detailed information and contact options.</p>
                                <p class="mt-4">Best regards,<br>Netflix Billing Team</p>
                            </div>
                        </div>
                    </div>
                `,
                type: "choice",
                threats: null,
                options: [
                    { text: "Open the attachment to check your Netflix bill", isCorrect: false },
                    { text: "Forward the email to your friends to see if they got the same invoice", isCorrect: false },
                    { text: "Delete the email and check your Netflix account directly through the official website or app", isCorrect: true },
                    { text: "Reply to the email asking for a PDF version instead", isCorrect: false }
                ],
                feedback: {
                    correct: "Correct! This is a malware distribution attempt. The red flags include: <ul class='list-disc ml-6 mt-2'><li>The attachment has a .exe extension (executable file), but invoices are typically PDF or HTML</li><li>The sender domain 'netflixsupport.com' is not Netflix's official domain</li><li>Netflix typically doesn't send invoices as attachments but provides them in your account</li></ul>Always verify billing information by logging directly into your account through the official website or app.",
                    incorrect: "This is a malware distribution attempt. Legitimate companies like Netflix don't send invoices as executable (.exe) files. Also notice the suspicious sender domain 'netflixsupport.com'. Always access your account directly through the official website or app to check billing information."
                }
            }
        ];
        
        totalScenarios = scenarios.length;
    }

    // Start the game
    function startGame() {
        initializeScenarios();
        welcomeScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        loadScenario(0);
        updateProgress();
    }

    // Load a scenario
    function loadScenario(index) {
        if (index >= scenarios.length) {
            endGame();
            return;
        }

        currentScenarioIndex = index;
        const scenario = scenarios[index];
        
        // Update level if changed
        if (currentLevel !== scenario.level) {
            currentLevel = scenario.level;
            currentLevelElement.textContent = `Level ${currentLevel}`;
        }

        // Set scenario content
        scenarioTitle.textContent = scenario.title;
        scenarioDescription.textContent = scenario.description;
        scenarioContainer.innerHTML = scenario.content;
        
        // Clear previous content
        interactionArea.innerHTML = '';
        feedbackArea.innerHTML = '';
        feedbackArea.classList.add('hidden');
        nextButton.classList.add('hidden');

        // Set up interaction based on scenario type
        if (scenario.type === "click") {
            // Set up clickable elements
            const clickableElements = scenarioContainer.querySelectorAll('.clickable');
            clickableElements.forEach(element => {
                element.addEventListener('click', function() {
                    const threatId = this.getAttribute('data-threat');
                    handleThreatClick(threatId);
                });
            });
        } else if (scenario.type === "choice") {
            // Set up multiple choice options
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
            
            scenario.options.forEach((option, optionIndex) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option-card p-4 bg-white';
                optionElement.innerHTML = `
                    <div class="flex items-center">
                        <div class="w-6 h-6 border-2 border-indigo-600 rounded-full flex items-center justify-center mr-3">
                            <span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span>
                        </div>
                        <span>${option.text}</span>
                    </div>
                `;
                optionElement.addEventListener('click', function() {
                    handleOptionClick(option.isCorrect);
                });
                optionsContainer.appendChild(optionElement);
            });
            
            interactionArea.appendChild(optionsContainer);
        }
    }

    // Handle clicked threat elements
    function handleThreatClick(threatId) {
        const scenario = scenarios[currentScenarioIndex];
        const clickedElement = document.querySelector(`[data-threat="${threatId}"]`);
        
        // Highlight the clicked element
        clickedElement.classList.add('highlight');
        
        // Check if all threats have been found
        const allThreatElements = scenarioContainer.querySelectorAll('.clickable');
        const highlightedElements = scenarioContainer.querySelectorAll('.highlight');
        
        if (highlightedElements.length === scenario.threats.length) {
            // All threats found
            score += 10;
            scoreElement.textContent = score;
            showFeedback(true);
        }
    }

    // Handle option click for multiple choice
    function handleOptionClick(isCorrect) {
        const optionCards = interactionArea.querySelectorAll('.option-card');
        
        // Disable all options
        optionCards.forEach(card => {
            card.style.pointerEvents = 'none';
            card.classList.add('opacity-70');
        });
        
        if (isCorrect) {
            score += 10;
            scoreElement.textContent = score;
        }
        
        showFeedback(isCorrect);
    }

    // Show feedback
    function showFeedback(isCorrect) {
        const scenario = scenarios[currentScenarioIndex];
        
        feedbackArea.innerHTML = `
            <div class="flex items-start ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'} p-4">
                <div class="mr-3">
                    <i class="fas ${isCorrect ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} text-2xl"></i>
                </div>
                <div>
                    <h4 class="font-semibold">${isCorrect ? 'Correct!' : 'Not quite right.'}</h4>
                    <div class="mt-1">${isCorrect ? scenario.feedback.correct : scenario.feedback.incorrect}</div>
                </div>
            </div>
        `;
        
        feedbackArea.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }

    // Update progress bar
    function updateProgress() {
        const progress = ((currentScenarioIndex) / totalScenarios) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Move to next scenario
    function nextScenario() {
        loadScenario(currentScenarioIndex + 1);
        updateProgress();
    }

    // End game and show results
    function endGame() {
        gameScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        finalScoreElement.textContent = score;
        
        // Set performance message based on score
        const maxScore = totalScenarios * 10;
        const percentage = (score / maxScore) * 100;
        
        if (percentage >= 90) {
            performanceMessage.textContent = "Excellent! You're a cybersecurity expert!";
        } else if (percentage >= 70) {
            performanceMessage.textContent = "Great job! You have good security awareness.";
        } else if (percentage >= 50) {
            performanceMessage.textContent = "Good effort! Keep practicing to improve your security skills.";
        } else {
            performanceMessage.textContent = "You're on your way to learning. Keep practicing!";
        }
    }

    // Reset game
    function resetGame() {
        currentLevel = 1;
        currentScenarioIndex = 0;
        score = 0;
        scoreElement.textContent = score;
        
        // Reset screens
        resultsScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // Start new game
        startGame();
    }

    // Event Listeners
    startGameButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', nextScenario);
    playAgainButton.addEventListener('click', resetGame);
});