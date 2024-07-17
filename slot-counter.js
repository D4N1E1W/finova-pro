function generateWeeklyPattern(seed) {
    const pattern = [];
    let remainingSlots = 3 + (seed % 7); // Start with 3-9 slots
    for (let i = 0; i < 7; i++) {
        pattern.push(remainingSlots);
        if (remainingSlots > 3 && Math.random() < 0.7) { // 70% chance to decrease
            remainingSlots -= Math.floor(Math.random() * Math.min(3, remainingSlots - 3)) + 1;
        }
    }
    return pattern;
}

function updateSlotCount() {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekNumber = Math.floor((today - new Date(today.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    const dayOfWeek = today.getDay();
    
    const seed = weekNumber + today.getFullYear();
    const weekPattern = generateWeeklyPattern(seed);
    const slotCount = weekPattern[dayOfWeek];

    const daysLeft = 7 - dayOfWeek;

    // Update all instances of slot count
    document.querySelectorAll('.slot-count').forEach(el => {
        el.textContent = slotCount;
    });

    // Update all instances of time frame
    document.querySelectorAll('.time-frame').forEach(el => {
        el.textContent = daysLeft === 1 ? 'today' : `in the next ${daysLeft} days`;
    });

    // Update progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progress = ((9 - slotCount) / 9) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Run on page load
updateSlotCount();

// Update every hour (you can adjust this interval)
setInterval(updateSlotCount, 60 * 60 * 1000);
