// Get a reference to the button element for installing the PWA
const butInstall = document.getElementById('buttonInstall');

// Logic for handling the beforeinstallprompt event, which is triggered when the app is eligible for installation
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered event for later use
    window.deferredPrompt = event;

    // Remove the hidden class from the button to make it visible
    butInstall.classList.toggle('hidden', false);
});

// Click event handler for the buttonInstall element
butInstall.addEventListener('click', async () => {
    // Retrieve the deferred prompt event
    const promptEvent = window.deferredPrompt;

    // If no prompt event is available, exit the function
    if (!promptEvent) {
        return;
    }

    // Show the installation prompt
    promptEvent.prompt();

    // Reset the deferredPrompt variable to null after using it, as it can only be used once
    window.deferredPrompt = null;

    // Hide the button after installation prompt is shown
    butInstall.classList.toggle('hidden', true);
});

// Event handler for the appinstalled event, triggered when the app is successfully installed
window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt variable to indicate that the installation has been completed
    window.deferredPrompt = null;
});
