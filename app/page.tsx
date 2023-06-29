import {getStoryblokApi, StoryblokComponent} from "@storyblok/react/rsc";
import {ISbStoriesParams} from "@storyblok/react";
import StoryblokStory from "@storyblok/react/story";
import StoryblokProvider from "@/utils/storyblok-provider.util";
import {draftMode} from "next/headers";

async function fetchData(version: string | undefined) {
  let sbParams = {version: version ?? 'draft' } as ISbStoriesParams;
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}


export default async function Home() {
  const {isEnabled} = draftMode();
  const version = isEnabled ? process.env.NEXT_PUBLIC_STORYBLOK_VERSION : 'draft';
  const {data} = await fetchData(version);
  return (<main>
      Enable: {isEnabled.toString()}
      {isEnabled || version === 'draft' ?
        <StoryblokProvider>
          <StoryblokStory story={data.story}/>
        </StoryblokProvider>
        :
        <StoryblokComponent blok={data.story.content}/>
      }
    </main>
  );
}

