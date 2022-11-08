import Joyride, { Step } from "react-joyride";

const steps: Array<Step> = [
  {
    target: ".all-character-container",
    content: "This is where you can see all of the characters available",
  },
  {
    target: ".show-by-number",
    content: "You can select how many characters are shown using this buttons",
  },
  {
    target: ".search-by-name",
    content:
      "You can search by name. Just insert their name and press enter or click the filter button. We use FTS so you don't kneed to know the exact character's name",
  },
  {
    target: ".filter-by-tags",
    content:
      "You can also search for multiple character that has the same tags",
  },
  {
    target: ".filter-btn",
    content:
      "Filter button is for applying the filter on shown characters, and the reset button used to clear all filters and return characters to default view",
  },
  {
    target: ".character-detail",
    content:
      "If you click one of the characters avatar, the character's detail will be shown here. You can also add characters to your team from the button that will show up here",
  },
  {
    target: ".my-team",
    content: "This is where your roster will be assembled",
  },
];

export const Onboarding = () => {
  return (
    <Joyride
      steps={steps}
      continuous
      showProgress
      spotlightClicks
      showSkipButton
    />
  );
};
