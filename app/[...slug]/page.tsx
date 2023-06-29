import StoryblokProvider from "@/utils/storyblok-provider.util";
import { getStoryblokApi, ISbStoriesParams, StoryblokComponent } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import { draftMode } from "next/headers";

interface Paths {
  slug: string[]
}

const version = process.env.NEXT_PUBLIC_STORYBLOK_VERSION
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links",  { version } as ISbStoriesParams);
  const {links} = data;
  let paths: Paths[] = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (links[linkKey].is_folder || links[linkKey].slug === 'home') {
      return
    }
    const slug = links[linkKey].slug
    let splittedSlug = slug.split('/')
    paths.push({ slug: splittedSlug })
  });

  return paths;
}


async function fetchData(params: Paths, version: string | undefined) {
  let sbParams = {version: version ?? ('draft')} as ISbStoriesParams;
  let slug = params.slug ? params.slug.join('/') : 'home'
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${slug}`, sbParams);
}

export default async function Page({ params } : {params: Paths}) {
  const { isEnabled } = draftMode();
  const version = isEnabled ? process.env.NEXT_PUBLIC_STORYBLOK_VERSION : 'draft';
  const { data } = await fetchData(params, version);
  return (
    <main>
      Enable: {isEnabled.toString()}
      {isEnabled || version === 'draft' ?
        <StoryblokProvider>
          <StoryblokStory story={data.story}/>
        </StoryblokProvider>
        :
        <StoryblokComponent blok={data.story.content}/>
      }
    </main>
  )
}
