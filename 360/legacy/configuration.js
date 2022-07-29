/* Nocheme Flug di nögscht Szene lade:

"options":{"autoPlay": true,"loop": false,"volume": 1},"events": {"onEnded": ["action-loadscene-4", "action-camera-7"]} 

ref: https://forum.forgejs.org/viewtopic.php?f=8&t=1194 */


                
var config = {
    "story":
    {
        "uid": "hotspots-DOM-story",
        "name": "Hotspots DOM Story",
        "slug": "hotspots-dom-story",
        "description": "This is sample of DOM hotspots",
        "default": "scene-0",

        "scenes":
        [
            {
                "uid": "scene-0",
                "name": "First scene",
                "slug": "first-scene",
                "description": "This is the first and only scene",
                "background": "#202040",

               "media":
                {
                    "uid": "media-0",
                    "type": "image",

                    "source":
                    {
                        "format": "equi",
                        "url": "rainbowcity.jpg"
                    }
                },
                
                 "camera":
                {
                    "parallax": 0,
                    "yaw": { "default" : -20 },
                    "pitch": { "default" : -20, "min": -180, "max": 30 },
                    "roll": { "default" : 0, "min": 0, "max": 0 },
                    "fov": { "default" : 50, "min": 20, "max": 80 }
                }

               
            }
        ]
    }
};

// Create a viewer
var viewer = new FORGE.Viewer("container", config);