import React from 'react'

import styles from './_CharacterEmblem.css'

export default class CharacterEmblem extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
  }

  render(){
    var character = this.props.character

    var light = character.powerLevel;
    var raceClass = character.race.raceName + " " + character.characterClass.className
    var emblem = {background: character.backgroundPath, icon: character.emblemPath}

    return
      <div className={styles.emblem}>
        <div className={styles.emblemIcon}></div>
        <div className={styles.info}>
          <p className={styles.light}>{light}</p>
          <p className={styles.raceClass}>{raceClass}</p>
        </div>
      </div>
    )
  }
}
