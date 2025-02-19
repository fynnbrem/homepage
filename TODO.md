# 🟢 Done

- Single Ball
- Box Constraints
- Mobile Touch Compatibility
- Elastic Impact
- Multiple Balls
- Inter-Ball Collision
- Visual Effects
    - Shadow that moves relative to the pointer.
        - Trail effect.

# 🟡 Planned

- Settings 1: Globals
    - Adjust Mouse Mass
    - Deactivate Mouse
    - Adjust Gravity
    - Adjust Wall Elasticity
    - Remove Inter-Ball-Collision
    - Adjust Gravity-Distance-Scaling
        - pow(3) diminishes quite fast.
    - Adjust Trail Length
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
- Visuals: Ball Trail
    - Make the ball trail fade out with distance to it.
    - This requires an approach using segmented trails, and canvas for proper opacity mixing.
- Dynamic Arena Size
    - Collide balls into the borders of the arena when shrinking.
- Adaptive Layout
- Settings 3
    - Pause
- Drag & Drop Balls
    - Works in Pause
    - Only while mouse is inactive (settings)
- Settings 4: Performance
    - Low Precision Mode (Reduce accuracy of calculations in favour of performance)

# 🟠 Unplanned

- Fix Issues with Collision
    - Balls can glitch through one another at high speeds.
    - Balls overlap slightly when sticking together.

# 🔴Cancelled