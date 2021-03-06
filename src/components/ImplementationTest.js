'use strict';

import EventBus from '../components/EventBus';

let instance = null;

/**
 * ImplementationTest
 */
class ImplementationTest {
    /**
     * Constructor of ImplementationTest.
     * @return {*}
     */
    constructor() {
        // Make this a singleton.
        if (instance) {
            return instance;
        } else {
            instance = this;
        }

        this.eventBus = new EventBus();
    }

    /**
     * Start testing.
     */
    start() {
        const css = `
            #tunnl-implementation {
                box-sizing: border-box;
                position: fixed;
                z-index: 100;
                bottom: 0;
                width: 100%;
                padding: 5px;
                background: linear-gradient(90deg,#3d1b5d,#5c3997);
                box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
                color: #fff;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 8px;
            }
            #tunnl-implementation > div {
                width: 100%;
            }
            #tunnl-implementation > div > div {
                float: left;
                margin-right: 10px;
            }
            #tunnl-implementation > div > div:last-of-type {
                float: right;
                margin-right: 0;
                text-align: right;
            }
            #tunnl-implementation h2 {
                color: #ffd1b1;
                text-shadow: 0 0.07em 0 rgba(0,0,0,.5);
                text-transform: uppercase;
                margin-bottom: 8px;
                font-size: 8px;
                line-height: 0;
            }
            #tunnl-implementation button {
                background: #44a5ab;
                margin-left: 2px;
                padding: 3px 10px;
                border: 0;
                border-radius: 3px;
                color: #fff;
                outline: 0;
                cursor: pointer;
                font-size: 8px;
            }
            #tunnl-implementation button:hover {
                background: #4fb3b9;
            }
            #tunnl-implementation button:active {
                background: #62bbc0;
            }
            #tunnl-implementation button:first-of-type {
                margin-left: 0;
            }
        `;

        const html = `
            <div id="tunnl-implementation">
                <div>
                    <div>
                        <h2>Advertisement</h2>
                        <button id="tunnl-showBanner">showBanner</button>
                        <button id="tunnl-cancel">Cancel</button>
                        <button id="tunnl-demo">Demo VAST tag</button>
                        <button id="tunnl-midrollTimer">Disable delay</button>
                    </div>
                    <div>
                        <h2>Content</h2>
                        <button id="tunnl-pause">Pause</button>
                        <button id="tunnl-resume">Resume</button>
                    </div>
                </div>
            </div>
        `;

        // Add css
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);

        // Add html
        const body = document.body || document.getElementsByTagName('body')[0];
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.zIndex = 100;
        container.style.bottom = 0;
        container.innerHTML = html;
        body.parentNode.insertBefore(container, body);

        // Add listeners
        const pauseContent = document.getElementById('tunnl-pause');
        const resumeContent = document.getElementById('tunnl-resume');
        const showBanner = document.getElementById('tunnl-showBanner');
        const cancelAd = document.getElementById('tunnl-cancel');
        const demoAd = document.getElementById('tunnl-demo');
        const midrollTimer = document.getElementById('tunnl-midrollTimer');

        if (localStorage.getItem('tunnl_tag')) {
            demoAd.innerHTML = 'Revert Vast tag';
            demoAd.style.background = '#ff8c1c';
        } else {
            demoAd.innerHTML = 'Demo VAST tag';
            demoAd.style.background = '#44a5ab';
        }

        if (localStorage.getItem('tunnl_midroll')) {
            midrollTimer.innerHTML = 'Revert delay';
            midrollTimer.style.background = '#ff8c1c';
        } else {
            midrollTimer.innerHTML = 'Disable delay';
            midrollTimer.style.background = '#44a5ab';
        }

        pauseContent.addEventListener('click', () => {
            window.tunnl.onPause();
        });
        resumeContent.addEventListener('click', () => {
            window.tunnl.onResume();
        });
        showBanner.addEventListener('click', () => {
            window.tunnl.showBanner();
        });
        cancelAd.addEventListener('click', () => {
            window.tunnl.videoAdInstance.cancel();
        });
        demoAd.addEventListener('click', () => {
            try {
                if (localStorage.getItem('tunnl_tag')) {
                    localStorage.removeItem('tunnl_tag');
                } else {
                    const tag = 'https://pubads.g.doubleclick.net/gampad/' +
                        'ads?sz=640x480&iu=/124319096/external/' +
                        'single_ad_samples&ciu_szs=300x250&impl=' +
                        's&gdfp_req=1&env=vp&output=vast' +
                        '&unviewed_position_start=1&' +
                        'cust_params=deployment%3Ddevsite' +
                        '%26sample_ct%3Dlinear&correlator=';
                    localStorage.setItem('tunnl_tag', tag);
                }
                location.reload();
            } catch (error) {
                console.log(error);
            }
        });
        midrollTimer.addEventListener('click', () => {
            try {
                if (localStorage.getItem('tunnl_midroll')) {
                    localStorage.removeItem('tunnl_midroll');
                } else {
                    localStorage.setItem('tunnl_midroll', 0);
                }
                location.reload();
            } catch (error) {
                console.log(error);
            }
        });
    }
}

export default ImplementationTest;
