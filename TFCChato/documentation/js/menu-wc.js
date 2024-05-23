'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">TFCChato documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutPageModule.html" data-type="entity-link" >AboutPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AboutPageModule-fbf57b566dad7bda51a14e6372a2f52b101f1506bbe57b2b4ccdfc5c98b8d797a42ff94022b2e7570e4caeff415b45351558df02fa475b7fa15ba3bbb1cd1dd5"' : 'data-bs-target="#xs-components-links-module-AboutPageModule-fbf57b566dad7bda51a14e6372a2f52b101f1506bbe57b2b4ccdfc5c98b8d797a42ff94022b2e7570e4caeff415b45351558df02fa475b7fa15ba3bbb1cd1dd5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutPageModule-fbf57b566dad7bda51a14e6372a2f52b101f1506bbe57b2b4ccdfc5c98b8d797a42ff94022b2e7570e4caeff415b45351558df02fa475b7fa15ba3bbb1cd1dd5"' :
                                            'id="xs-components-links-module-AboutPageModule-fbf57b566dad7bda51a14e6372a2f52b101f1506bbe57b2b4ccdfc5c98b8d797a42ff94022b2e7570e4caeff415b45351558df02fa475b7fa15ba3bbb1cd1dd5"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageRoutingModule.html" data-type="entity-link" >AboutPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AccessPageModule.html" data-type="entity-link" >AccessPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AccessPageModule-20f4309532324572591397006c8093310fd3bef0df68e7247dcbfa60ea402fb92827db2906cb20983ec167d21da5e99f40304f4b8293e3c0d1896a755d6cb174"' : 'data-bs-target="#xs-components-links-module-AccessPageModule-20f4309532324572591397006c8093310fd3bef0df68e7247dcbfa60ea402fb92827db2906cb20983ec167d21da5e99f40304f4b8293e3c0d1896a755d6cb174"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccessPageModule-20f4309532324572591397006c8093310fd3bef0df68e7247dcbfa60ea402fb92827db2906cb20983ec167d21da5e99f40304f4b8293e3c0d1896a755d6cb174"' :
                                            'id="xs-components-links-module-AccessPageModule-20f4309532324572591397006c8093310fd3bef0df68e7247dcbfa60ea402fb92827db2906cb20983ec167d21da5e99f40304f4b8293e3c0d1896a755d6cb174"' }>
                                            <li class="link">
                                                <a href="components/AccessPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccessPageRoutingModule.html" data-type="entity-link" >AccessPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' : 'data-bs-target="#xs-components-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' :
                                            'id="xs-components-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' : 'data-bs-target="#xs-pipes-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' :
                                            'id="xs-pipes-links-module-AppModule-ebe34ab56aaf5df1ba2da6d2ee03968f80af78ba533962f22f4c31e8c6b3ec0343462a0ca7e09a7e7bba45d0be709c129962a5420440a1ca303a1e6764b496cf"' }>
                                            <li class="link">
                                                <a href="pipes/CapitalizeInitialPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapitalizeInitialPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DataPageModule.html" data-type="entity-link" >DataPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DataPageModule-7a6b0c46af468d82f0550b51db204437b1f0a743fa8f78fb8fae098984f38413faf7105346b881646a4327545c1c7be4163d0c010c536d0fe3ce4ccd194fbf53"' : 'data-bs-target="#xs-components-links-module-DataPageModule-7a6b0c46af468d82f0550b51db204437b1f0a743fa8f78fb8fae098984f38413faf7105346b881646a4327545c1c7be4163d0c010c536d0fe3ce4ccd194fbf53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataPageModule-7a6b0c46af468d82f0550b51db204437b1f0a743fa8f78fb8fae098984f38413faf7105346b881646a4327545c1c7be4163d0c010c536d0fe3ce4ccd194fbf53"' :
                                            'id="xs-components-links-module-DataPageModule-7a6b0c46af468d82f0550b51db204437b1f0a743fa8f78fb8fae098984f38413faf7105346b881646a4327545c1c7be4163d0c010c536d0fe3ce4ccd194fbf53"' }>
                                            <li class="link">
                                                <a href="components/DataPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalCategoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataPageRoutingModule.html" data-type="entity-link" >DataPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-3afcc37851d96b4a8b57bf1b40d54ff560522d95b903db5dead47f3bb10f12fa5dbe04e6ab313b9ef60f9638077c9956fceda4f2880d749dca00eee2693e52c3"' : 'data-bs-target="#xs-components-links-module-HomePageModule-3afcc37851d96b4a8b57bf1b40d54ff560522d95b903db5dead47f3bb10f12fa5dbe04e6ab313b9ef60f9638077c9956fceda4f2880d749dca00eee2693e52c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-3afcc37851d96b4a8b57bf1b40d54ff560522d95b903db5dead47f3bb10f12fa5dbe04e6ab313b9ef60f9638077c9956fceda4f2880d749dca00eee2693e52c3"' :
                                            'id="xs-components-links-module-HomePageModule-3afcc37851d96b4a8b57bf1b40d54ff560522d95b903db5dead47f3bb10f12fa5dbe04e6ab313b9ef60f9638077c9956fceda4f2880d749dca00eee2693e52c3"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IncidentDataPageModule.html" data-type="entity-link" >IncidentDataPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IncidentDataPageModule-ed9b415f98c613f823eb8a0bdbce3db09b3d609eac8c593aef2f1a82448282b1c68241a9e959dfa3596dc944612b2cc79c935f0e19ec0102391c2e68612adba0"' : 'data-bs-target="#xs-components-links-module-IncidentDataPageModule-ed9b415f98c613f823eb8a0bdbce3db09b3d609eac8c593aef2f1a82448282b1c68241a9e959dfa3596dc944612b2cc79c935f0e19ec0102391c2e68612adba0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IncidentDataPageModule-ed9b415f98c613f823eb8a0bdbce3db09b3d609eac8c593aef2f1a82448282b1c68241a9e959dfa3596dc944612b2cc79c935f0e19ec0102391c2e68612adba0"' :
                                            'id="xs-components-links-module-IncidentDataPageModule-ed9b415f98c613f823eb8a0bdbce3db09b3d609eac8c593aef2f1a82448282b1c68241a9e959dfa3596dc944612b2cc79c935f0e19ec0102391c2e68612adba0"' }>
                                            <li class="link">
                                                <a href="components/IncidentDataPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncidentDataPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IncidentDataPageRoutingModule.html" data-type="entity-link" >IncidentDataPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageModule.html" data-type="entity-link" >SettingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SettingsPageModule-60d83d90cf2e270c333e2bd9d75e2ffcd9d52bdbb3317bc21575cd777fae38a15a97e46ed3ac6168a49649e88340c93e412f80e316d3645eee34ca39361b9d87"' : 'data-bs-target="#xs-components-links-module-SettingsPageModule-60d83d90cf2e270c333e2bd9d75e2ffcd9d52bdbb3317bc21575cd777fae38a15a97e46ed3ac6168a49649e88340c93e412f80e316d3645eee34ca39361b9d87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsPageModule-60d83d90cf2e270c333e2bd9d75e2ffcd9d52bdbb3317bc21575cd777fae38a15a97e46ed3ac6168a49649e88340c93e412f80e316d3645eee34ca39361b9d87"' :
                                            'id="xs-components-links-module-SettingsPageModule-60d83d90cf2e270c333e2bd9d75e2ffcd9d52bdbb3317bc21575cd777fae38a15a97e46ed3ac6168a49649e88340c93e412f80e316d3645eee34ca39361b9d87"' }>
                                            <li class="link">
                                                <a href="components/SettingsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageRoutingModule.html" data-type="entity-link" >SettingsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' : 'data-bs-target="#xs-components-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' :
                                            'id="xs-components-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' }>
                                            <li class="link">
                                                <a href="components/CategoriesInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IncidentsCircleGraphicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncidentsCircleGraphicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IncidentsInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncidentsInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PictureSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PictureSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserCircleGraphicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCircleGraphicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' :
                                            'id="xs-pipes-links-module-SharedModule-8eae16614b0dfd8295ef4a4305b733987cef39da0317456c4efb07057ce2d5a50339e81b58be499906f7111f7237ad09612e91a1c953df1792a949c001da8666"' }>
                                            <li class="link">
                                                <a href="pipes/ShortenTextPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortenTextPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserDataPageModule.html" data-type="entity-link" >UserDataPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserDataPageModule-d04ffe37b99dcc070a342ca00a8fad26c50c529a2eaf4fc51759926ba41d6df58ff4a37b9b33ddb526cf1b7ee69753eff6c98d7e4f4782a0584dea6d96ea1a00"' : 'data-bs-target="#xs-components-links-module-UserDataPageModule-d04ffe37b99dcc070a342ca00a8fad26c50c529a2eaf4fc51759926ba41d6df58ff4a37b9b33ddb526cf1b7ee69753eff6c98d7e4f4782a0584dea6d96ea1a00"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserDataPageModule-d04ffe37b99dcc070a342ca00a8fad26c50c529a2eaf4fc51759926ba41d6df58ff4a37b9b33ddb526cf1b7ee69753eff6c98d7e4f4782a0584dea6d96ea1a00"' :
                                            'id="xs-components-links-module-UserDataPageModule-d04ffe37b99dcc070a342ca00a8fad26c50c529a2eaf4fc51759926ba41d6df58ff4a37b9b33ddb526cf1b7ee69753eff6c98d7e4f4782a0584dea6d96ea1a00"' }>
                                            <li class="link">
                                                <a href="components/UpdateUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDataPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDataPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserDataPageRoutingModule.html" data-type="entity-link" >UserDataPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/EmailValidation.html" data-type="entity-link" >EmailValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseAuthService.html" data-type="entity-link" >FirebaseAuthService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseDataService.html" data-type="entity-link" >FirebaseDataService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseMediaService.html" data-type="entity-link" >FirebaseMediaService</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidation.html" data-type="entity-link" >PasswordValidation</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomTranslateService.html" data-type="entity-link" >CustomTranslateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseService.html" data-type="entity-link" >FirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientProvider.html" data-type="entity-link" >HttpClientProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientWebProvider.html" data-type="entity-link" >HttpClientWebProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IncidentsService.html" data-type="entity-link" >IncidentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalService.html" data-type="entity-link" >LocalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MediaService.html" data-type="entity-link" >MediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CategoryInfo.html" data-type="entity-link" >CategoryInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseDocument.html" data-type="entity-link" >FirebaseDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseStorageFile.html" data-type="entity-link" >FirebaseStorageFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseUserCredential.html" data-type="entity-link" >FirebaseUserCredential</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/incidentInfo.html" data-type="entity-link" >incidentInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Media.html" data-type="entity-link" >Media</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatedData.html" data-type="entity-link" >PaginatedData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Photo.html" data-type="entity-link" >Photo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCredentials.html" data-type="entity-link" >UserCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfo.html" data-type="entity-link" >UserInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegisterInfo.html" data-type="entity-link" >UserRegisterInfo</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/ShortenTextPipe.html" data-type="entity-link" >ShortenTextPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});