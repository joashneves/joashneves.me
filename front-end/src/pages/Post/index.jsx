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
    <section id="conteudo" style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4.5rem', color: 'var(--title-green-color)', fontStyle: 'italic', fontWeight: 'bold' }}>
            Blog & Artigos
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--gh-dark-fg-muted)', marginTop: '1rem' }}>
            Explorando tecnologia, desenvolvimento e outras curiosidades.
          </p>
          <div style={{ width: '100%', height: '1px', background: 'var(--gh-dark-border-default)', marginTop: '2rem' }}></div>
        </header>

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