import { FunctionComponent } from 'react'
import styles from '../../styles/Home.module.css'
import {SbBlokData, StoryblokComponent, storyblokEditable} from "@storyblok/react/rsc";
import {BlokComponentModel} from "@/models/blok-component.model";

interface GridProps extends SbBlokData {
  columns: SbBlokData[]
}
const Grid: FunctionComponent<BlokComponentModel<GridProps>> = ({ blok }) => {
  return (
    <div className={styles.grid} {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok) => (
        <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
      ))}
    </div>
  )
}

export default Grid
