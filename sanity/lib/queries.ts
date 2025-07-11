import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      slug,
      author -> { _id, name },
      views,
      description,
      category,
      image,
    }`
);

export const STARTUP_QUERY_BY_ID = defineQuery(`
  *[_type == 'startup' && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, username, image, bio , email
    },
    views,
    description,
    category,
    image,
    pitch
  }
`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
      *[_type == 'startup' && _id == $id][0] {
      views , _id
    }
`)

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == 'author' && id == $id][0]{
      _id,
      id,
      name,
      username , 
      image , 
      bio,
      email,
    } 
  `)
export const AUTHOR_BY_OWN_ID_QUERY = defineQuery(`
    *[_type == 'author' && _id == $id][0]{
      _id,
      id,
      name,
      username , 
      image , 
      bio,
      email,
    } 
  `)


  
export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(
  `*[_type == 'startup' && author._ref == $id] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      slug,
      author -> { _id, name },
      views,
      description,
      category,
      image,
    }`
);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(
  `*[_type == playlist && slug.current == $slug][0] {
    _id,
    title,
    slug,
    select[] -> {
      _id,
      _createdAt,
      title,
      slug,
      author -> { _id, name , slug , image , bio },
      views,
      description,
      category,
      image,
      pitch
    }
  }`
)