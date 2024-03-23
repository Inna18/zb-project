import React, { useEffect, useState } from 'react'

import styles from "../page.module.css"

interface listProps {
    id: string,
    title: string,
    url: string
}

const PhotoList = () => {
  const [list, setList] = useState<listProps[]>([]);
  const [photoTitle, setPhotoTitle] = useState<string>("");

  const load = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4f3d7a795a670a844f88c89ce73d7f12&sort=relevance&text=${photoTitle}&per_page=10&format=json&nojsoncallback=1`, 
    {  method: "GET" })
    .then(res => res.json())
    .then(data => {
        if (data.stat === "ok") {
            let tempList: listProps[] = [];
            data.photos.photo.map((photo: { id: string; title: string; server: string; secret: string; }) => {
                tempList.push({ id: photo.id, title: photo.title, url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg` })
            });
            setList(tempList);
        } else {
            setList([])
        }
    })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => load(), 300);
    return () => clearTimeout(timeoutId)
  }, [photoTitle])
 

  return (
    <div className={styles.listContainer}>
        <h3>Photo Gallery</h3>
        <div className={styles.photoSearch}>
            <input type="text" value={photoTitle} onChange={(e) => setPhotoTitle(e.target.value)} placeholder='이미지 검색해보세요...' />
        </div>
        <div className={styles.photoList}>
            { list.map(photo => (
                <img key={`${photo.id}`} src={`${photo.url}`} alt={`${photo.title}`} />
            ))}
        </div>
    </div>
  )
}

export default PhotoList
