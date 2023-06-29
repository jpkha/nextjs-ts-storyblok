import {apiPlugin, storyblokInit} from "@storyblok/react/rsc";
import PageStory from "@/components/page/PageStory";
import Grid from "@/components/grid/Grid";
import Feature from "@/components/feature/Feature";
import Teaser from "@/components/teaser/Teaser";

export const AppStoryblokInit = () => {
  storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
      page: PageStory,
      grid: Grid,
      feature: Feature,
      teaser: Teaser,
    }
  });
}