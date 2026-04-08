import React from "react";
import SearchBar from '../../components/Public/SearchBar'
import TagFilter from '../../components/Public/TagFilter'
import Pagination from '../../components/Public/Pagination'
import PostCard from '../../components/Public/PostCard'
import { useState } from 'react'
import { useApi } from '../../services/api'
import EstiloDigital from "../../components/DigitalStyle";
import styles from './Post.module.css'

export default function Post(){
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: tags } = useApi('/tags/')
  const { data: postsData } = useApi(`/posts/?q=${search}&tag=${tagFilter}&page=${page}`)

  const posts = postsData?.items || []

  return(
    <section className={styles.container}>
      <header className={styles.header}>
        <EstiloDigital>
          Ideias escritas por mim
        </EstiloDigital>
        <p className={styles.description}>
          Explorando tecnologia, desenvolvimento e outras curiosidades.
        </p>
        <div className={styles.divider}></div>
      </header>

      <SearchBar 
        value={search} 
        onChange={(val) => { setSearch(val); setPage(1); }} 
        placeholder="O que você procura?" 
      />

      <TagFilter 
        tags={tags} 
        selectedTag={tagFilter} 
        onSelect={(id) => { setTagFilter(id); setPage(1); }} 
      />

      <div className={styles.grid}>
        {posts.length > 0 ? posts.map(post => (
          <PostCard key={post.id} post={post} tags={tags} />
        )) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Nenhum artigo encontrado para esta pesquisa.</p>
          </div>
        )}
      </div>

      <Pagination 
        total={postsData?.total} 
        perPage={postsData?.per_page} 
        currentPage={page} 
        onPageChange={setPage} 
      />
    </section>
  )
}
