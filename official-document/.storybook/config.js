import {
  configure,
  addParameters
} from '@storybook/angular';
import {
  themes
} from '@storybook/theming';

// automatically import all files ending in *.stories.ts
const req = require.context('../src/stories', true, /\.stories\.ts$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    theme: themes.dark,
  },
});

configure(loadStories, module);
