

# 🟡 Planned
- Add fly-in and fly-out animations.
  - The time before and after the collision calculations.
- Add configuration
  - Mass Ratio (The mass of the major block)
    - In `100^n` steps.
  - Also add a "Start" button, we cannot retroactively apply mass changes.
- Make the weight numbers only show for 2 seconds at the very start.
  - Fade out after that.
- Separate the code into more modules.
- Make the timescale dynamic and configurable.
  - It needs to be modify-able during an active simulation.
- Animate the collision counter.
  - It jitters and grows every according to the current collision rate.
- Viewport scaling
  - During their collision phase, the blocks must always be visible.
  - If a block exceeds the range, scale down the simulation to remain in the viewport.

# 🟢 Done

# 🐞 Bugs
- After reloading, we sometimes get an error.
  - Not sure under which condition it happens. Seems to be after long inactivity.
  - Likely and index error.
  - Cannot read properties of undefined (reading 'minorPos')
  - colls[lastIndex].minorPos,

# ✨ Fixed

# 🔴Discarded
