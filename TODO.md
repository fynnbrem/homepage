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

# 🟡 Planned

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
- Make the Balls use State
    - Update the state every tick with copies of the balls.
    - This prevents rendering of positions that only exist within a tick, due to an in-tick rerender.
    - Evaluate performance cost.
- Settings 2: Balls
    - Add/Remove Balls
    - Configure Balls
        - Mass
        - Radius
        - Elasticity
        - Color
- Visuals 2: Refined Trail Effect
    - Make the ball trail fade out with distance to it.
    - This requires an approach using segmented trails, and canvas for proper opacity mixing.
    - Add an extra visual effect wherever two balls collide.
- Dynamic Arena Size
    - Collide balls into the borders of the arena when shrinking.
- Adaptive Layout
- Settings 3
    - Pause
- Use LocalStorage
- Drag & Drop Balls
    - Works in Pause
    - Only while mouse is inactive (settings)

# 🟠 Unplanned

- Fix Issues with Collision
    - Balls can glitch through one another at high speeds.
    - Balls overlap slightly when sticking together.
- Settings 4: Performance
    - Low Precision Mode (Reduce accuracy of calculations in favour of performance)

# 🔴Cancelled