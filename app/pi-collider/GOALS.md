# 🟡 Planned

- Make the timescale dynamic and configurable.
    - It needs to be modify-able during an active simulation.
- Viewport scaling
    - During their collision phase, the blocks must always be visible.
    - If a block exceeds the range, scale down the simulation to remain in the viewport.
- Add loading animation for long collision calculations.
- Lazy load the collisions the simulation can start instantly.
    - Use the buffer provided by the fly-in to make some calculations beforehand.
- Add some information on what this is, for the user.
- Dynamic timescale
    - Slow down the time for short collision intervals to make them more visible.
    - Might also require a dynamic distance scale to see something.
    - Can already be applied at the time of collision generation.
- Dynamic time and distance visualization.
    - To transfer the dynamic scaling to the viewer.
    - A scaling grid in the background for distance.
    - A timer for the time.
- Evaluate the Epsilon value.
    - The closest the major block comes to the wall (It's distance to the wall minus the minor block length).
    - Approaches zero for high collision counts.

# 🟢 Done

- Add a frame for the blocks to slide and collide.
- Animate the collision counter.
    - It jitters and grows every according to the current collision rate.
- Add configuration
    - Mass Ratio (The mass of the major block)
        - In `100^n` steps.
    - Also add a "Start" button, we cannot retroactively apply mass changes.
- Separate the code into more modules.
- Add fly-in and fly-out animations.
    - The time before and after the collision calculations.

# 🐞 Bugs

# ✨ Fixed

- After reloading, we sometimes get an error.
    - Not sure under which condition it happens. Seems to be after long inactivity.
    - Likely and index error.
        - `Cannot read properties of undefined (reading 'minorPos')`
        - `colls[lastIndex].minorPos`
    - Fixed: Was due to a possible `-1` index when the frame time synced up with the start time.

# 🔴Discarded

- Make the weight numbers only show for 2 seconds at the very start.
    - Fade out after that.
    - Discarded: The blocks look pretty plain without the numbers, they actually work nice as decor.