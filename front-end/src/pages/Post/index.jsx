import React from "react";
import SearchBar from '../../components/Public/SearchBar'
import TagFilter from '../../components/Public/TagFilter'
import Pagination from '../../components/Public/Pagination'
import PostCard from '../../components/Public/PostCard'
import { useState } from 'react'
import Button from '../../components/Button'
import { useApi } from '../../services/api'
import { Link } from 'react-router-dom'

export default function Post(){

      const [search, setSearch] = useState('')
    const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: tags } = useApi('/tags/')
  const { data: postsData } = useApi(`/posts/?q=${search}&tag=${tagFilter}&page=${page}`)

  const posts = postsData?.items || []



    return(
    <>
    <section id="conteudo" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', borderBottom: '2px solid var(--gh-dark-border-default)', paddingBottom: '0.8rem' }}>
          Blog & Artigos
        </h2>

        <SearchBar 
          value={search} 
          onChange={(val) => { setSearch(val); setPage(1); }} 
          placeholder="O que você quer ler hoje?" 
        />

        <TagFilter 
          tags={tags} 
          selectedTag={tagFilter} 
          onSelect={(id) => { setTagFilter(id); setPage(1); }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {posts.length > 0 ? posts.map(post => (
            <PostCard key={post.id} post={post} tags={tags} />
          )) : (
            <div style={{ textAlign: 'center', padding: '6rem' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--gh-dark-fg-muted)' }}>Nenhum artigo encontrado para esta pesquisa.</p>
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
      </>)
}