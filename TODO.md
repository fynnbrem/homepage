# 🟢 Done

- Single Ball
- Box Constraints
- Mobile Touch Compatibility
- Elastic Impact
- Multiple Balls
- Inter-Ball Collision
- Visuals: Shadows and Trails
    - Shadow that moves relative to the pointer.
    - Trail effect.
- Settings 1: Globals
    - Adjust Mouse Mass
    - Adjust Gravity Force & Angle
    - Adjust Wall Elasticity
    - Remove Inter-Ball-Collision
    - Adjust Gravity-Distance-Scaling
        - pow(3) diminishes quite fast.
    - Adjust Trail Length
- Add GitHub Link
    - As a small badge at the bottom right of the page.
- Refactor Files and Folders
    - Match React's naming style.
- Visuals 3: Background and Frame
    - Use smiley face as background.
        - Find a good frame for the arena and settings.
- Make the Balls use State
    - Update the state every tick with copies of the balls.
    - This prevents rendering of positions that only exist within a tick, due to an in-tick rerender.
    - Evaluate performance cost.
- Refactor: Split up `Arena.tsx`
- Settings 2: Balls
    - Add/Remove Balls
    - Configure Balls
        - Mass
        - Radius
        - Elasticity
        - Color
    - Tooltip
- Visuals 2: Balls
    - Make the ball trail fade out with distance to it.
    - Add an inset lightning effect so the balls look less flat.
- Interaction: Dynamic Arena Size
    - Collide balls into the borders of the arena when shrinking.
- Content: About Me
  - Also add into URL
  
# 🟡 Planned


- Visuals: Adaptive Layout
  - We need an entirely new layout for mobile devices.
- Visuals: Layout scaling.
  - Currently, the components do not scale, 
    resulting a notably small view on 4k monitors and an overflow on 720p monitors.
- Interaction: Better Collision
    - Collision Interpolation (For high speed collisions)
    - Multi Collision (Wall + Ball Collision)
    - Noise Flooring
- Visuals: Light Mode
    - Also add a switch for manual selection.
- Visuals: Starting Parameters
    - Find starting parameters (velocity, position) that quickly result in a nice ball constellation.
- Settings 3
    - Pause
- Interaction: Use LocalStorage
- Interaction: Drag & Drop Balls
    - Works in Pause
    - Only while mouse is inactive (settings)

# 🟠 Unplanned

- Fix Issues with Collision
    - Balls can glitch through one another at high speeds.
    - Balls overlap slightly when sticking together.
- Settings 4: Performance
    - Low Precision Mode (Reduce accuracy of calculations in favour of performance)
- Visuals: Bounce Effect
    - A bounce effect when a ball collides with the wall.
    - Deform the wall?
    - Make the box shake?
    - Balls jiggle when they collide (With enough velocity).

# 🔴Cancelled