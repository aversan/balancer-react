import Tooltip from './BalTooltip.vue';
import { generateTemplate } from '../../../../../../Downloads/frontend-v2-develop/.storybook/helpers/templates';

export default {
  component: Tooltip,
  title: 'Components/BalTooltip',
  parameters: {
    layout: 'centered'
  },
  args: {
    title: 'Tooltip',
    darkMode: false
  }
};

type Props = {
  show?: boolean;
  title?: string;
  noPad?: boolean;
};

const Template = (args: Props) => ({
  components: { Tooltip },
  setup() {
    return { args };
  },
  template: generateTemplate(`
    <Tooltip placement="left">
        This can be any sort of content I want
    </Tooltip>
`)
});

export const DefaultTooltip = Template.bind({});
// @ts-ignore
DefaultTooltip.args = { title: 'Tooltip', show: true };
