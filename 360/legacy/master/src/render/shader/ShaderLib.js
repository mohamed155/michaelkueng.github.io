/**
 * @namespace {FORGEProgram} FORGE.ShaderLib
 */

//jscs:disable

FORGE.ShaderLib = {

    screenToWorld:
    {
        rectilinear:
        {
            /** @type {FORGEUniform} */
            uniforms:
            {
                tTexture: { type: "t", value: null },
                tViewportResolution: { type: "v2", value: new THREE.Vector2() },
                tViewportResolutionRatio: { type: "f", value: 1.0 },
                tModelViewMatrixInverse: { type: "m4", value: new THREE.Matrix4() },
                tProjectionScale: { type: "f", value: 1.0 }
            },

            vertexShader: FORGE.ShaderChunk.stw_vert_proj,
            fragmentShader: FORGE.ShaderChunk.stw_frag_proj_rectilinear
        },

        flat:
        {
            /** @type {FORGEUniform} */
            uniforms:
            {
                tTexture: { type: "t", value: null },
                tTextureRatio: { type: "f", value: 1.0 },
                tViewportResolution: { type: "v2", value: new THREE.Vector2() },
                tViewportResolutionRatio: { type: "f", value: 1.0 },
                tFov: { type: "f", value: 0.0 },
                tYaw: { type: "f", value: 0.0 },
                tPitch: { type: "f", value: 0.0 },
                tRepeatX: { type: "i", value: 0 },
                tRepeatY: { type: "i", value: 0 }
            },

            vertexShader: FORGE.ShaderChunk.stw_vert_proj,
            fragmentShader: FORGE.ShaderChunk.stw_frag_proj_flat
        },

        gopro:
        {
            /** @type {FORGEUniform} */
            uniforms:
            {
                tTexture: { type: "t", value: null },
                tViewportResolution: { type: "v2", value: new THREE.Vector2() },
                tViewportResolutionRatio: { type: "f", value: 1.0 },
                tModelViewMatrixInverse: { type: "m4", value: new THREE.Matrix4() },
                tProjectionDistance: { type: "f", value: 0.0 },
                tProjectionScale: { type: "f", value: 1.0 }
            },

            vertexShader: FORGE.ShaderChunk.stw_vert_proj,
            fragmentShader: FORGE.ShaderChunk.stw_frag_proj_gopro
        }
    },

    worldToScreen:
    {
        rectilinear:
        {
            mapping:
            {
                /** @type {FORGEUniform} */
                uniforms:
                {
                    tOpacity: { type: "f", value: 1.0 },
                    tTexture: { type: "t", value: null }
                },
                vertexShader: FORGE.ShaderChunk.wts_vert_rectilinear,
                fragmentShader: FORGE.ShaderChunk.wts_frag
            },

            wireframe:
            {
                /** @type {FORGEUniform} */
                uniforms:
                {
                    tColor: { type: "c", value: null },
                    tModelViewMatrixInverse: { type: "m4", value: null }
                },
                vertexShader: FORGE.ShaderChunk.wts_vert_rectilinear_wireframe,
                fragmentShader: FORGE.ShaderChunk.wts_frag_wireframe
            }
        },

        flat:
        {
            mapping:
            {
                /** @type {FORGEUniform} */
                uniforms:
                {
                    tOpacity: { type: "f", value: 1.0 },
                    tTexture: { type: "t", value: null }
                },
                vertexShader: FORGE.ShaderChunk.wts_vert_rectilinear,
                fragmentShader: FORGE.ShaderChunk.wts_frag
            },

             wireframe:
            {
                /** @type {FORGEUniform} */
                uniforms:
                {
                    tColor: { type: "c", value: null },
                    tModelViewMatrixInverse: { type: "m4", value: null }
                },
                vertexShader: FORGE.ShaderChunk.wts_vert_rectilinear_wireframe,
                fragmentShader: FORGE.ShaderChunk.wts_frag_wireframe
            }
        },

        gopro:
        {
            mapping:
            {
                /** @type {FORGEUniform} */
                uniforms:
                {
                    tOpacity: { type: "f", value: 1.0 },
                    tTexture: { type: "t", value: null },
                    tProjectionDistance: { type: "f", value: 1 }
                },
                vertexShader: FORGE.ShaderChunk.wts_vert_gopro,
                fragmentShader: FORGE.ShaderChunk.wts_frag
            },

            wireframe:
            {
                /** @type {FORGEUniform} */
                uniforms:
                {
                    tColor: { type: "c", value: null },
                    tProjectionDistance: { type: "f", value: 1 }
                },
                vertexShader: FORGE.ShaderChunk.wts_vert_gopro_wireframe,
                fragmentShader: FORGE.ShaderChunk.wts_frag_wireframe
            }
        }
    }
};

//jscs:enable

FORGE.ShaderLib.parseIncludes = function(string)
{
    var pattern = /#include +<([\w\d.]+)>/g;

    function replace( match, include )
    {
        var r = FORGE.ShaderChunk[include];

        if (typeof r === "undefined")
        {
            r = THREE.ShaderChunk[include];

            if (typeof r === "undefined")
            {
                throw new Error( "Can not resolve #include <" + include + ">" );
            }
        }

        return FORGE.ShaderLib.parseIncludes(r);
    }

    return string.replace( pattern, replace );
};
