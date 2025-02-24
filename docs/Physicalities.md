# Physical Approximations

- The calculations are applied on discrete time steps, the true path can differ, especially with many objects.
- Collisions are calculated before the object actually collides.
    - A collision is performed when the object would collide on the next tick.
    - As approximation, the objects get placed right next to each other on the moment of collision.
        - This causes extra distance covered within a single tick.
- Zero Collision Mode: The mass acting out the gravitational force is constant for every object.
    - In reality, the mass would increase linear starting from the center.
    - Even without Zero Collision Mode, you can observe this with the mouse gravity.
    - A minimal distance of 10px is enforced to prevent excessive acceleration.
- Collisions with the wall are calculated before collisions between balls one every tick.
    - This causes an imprecise position if the ball has multiple collisions within the same tick.
- Balls can glitch through one another on high speeds.
    - One reason is that collisions of balls moving away from each other are ignored, e.g. when a ball is fast that it
      moves behind the other one within one tick.
    - Another reason is that only the final position is scanned, allowing a ball to completely phase through another one
      if it has enough velocity to do so in one tick.