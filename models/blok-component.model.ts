import {ISbStoryData} from "@storyblok/react";

export interface BlokComponentModel<T> {
  blok: T
  stories?: ISbStoryData[]
}
