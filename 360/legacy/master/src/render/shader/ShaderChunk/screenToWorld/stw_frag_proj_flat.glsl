/**
 * Fragment shader reverse projection - screen to world
 * Flat view projection
 */

#include <defines>

uniform sampler2D tTexture;
uniform vec2 tViewportResolution;
uniform float tViewportResolutionRatio;
uniform float tTextureRatio;
uniform float tFov;
uniform float tYaw;
uniform float tPitch;

uniform int tRepeatX;
uniform int tRepeatY;

#include <helpers>
#include <coordinates>
#include <texcoords>

void main() {
    // Texture resolution in spherical coordinates
    vec2 sTexResolution = PI * vec2(tTextureRatio, 1.0);

    // Frame reference in spherical coordinates
    vec2 sReference = vec2(tYaw, tPitch) + sTexResolution / 2.0;

    // Get texel in spherical coordinates
    vec2 sTexel = sReference + (tFov * 0.5) * getFragment();

    // Get texture coordinates
    vec2 uv = sTexel / sTexResolution;

    if (isTrue(tRepeatX)) {
        uv.x = mod(uv.x, 1.0);
    }
    else if (uv.x > 1.0 || uv.x < 0.0) {
        discard;
    }

    if (isTrue(tRepeatY)) {
        uv.y = mod(uv.y, 1.0);
    }
    else if (uv.y > 1.0 || uv.y < 0.0) {
        discard;
    }

    gl_FragColor = vec4(texture2D(tTexture, uv).rgb, 1.0);
}
