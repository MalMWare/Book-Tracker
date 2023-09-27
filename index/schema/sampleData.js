//Dummy data
let books = [
    { name: 'Attack on Titan Vol. 01', genre: 'Horror', pages: '193', published: 'March 17, 2010', awards: 'Kodansha Manga Award for Shonen (2011)', id: '1', authorId: '1' },
    { name: 'Lore Olympus Vol. 01', genre: 'Fantasy', pages: '384', published: 'November 2, 2021', awards: 'Best Graphic Novel & Comic (2021)', id: '2', authorId: '2' },
    { name: 'The Song of Achilles', genre: 'Historical Fiction', pages: '408', published: 'September 20, 2011', awards: 'Best Novel (2013)', id: '3', authorId: '3' },
    { name: 'Attack on Titan Vol. 02', genre: 'Horror', pages: '189', published: 'July 17, 2010', id: '4', authorId: '1' },
    { name: 'Attack on Titan Vol. 03', genre: 'Horror', pages: '208', published: 'December 9, 2010', id: '5', authorId: '1' },
    { name: 'Circe', genre: 'Fantasy', pages: '393', published: 'April 10, 2018', awards: 'Best Fantasy (2018)', id: '6', authorId: '3' },
    { name: 'Lore Olympus Vol. 02', genre: 'Fantasy', pages: '368', published: 'July 5, 2022', awards: 'Best Graphic Novel & Comic (2022)', id: '7', authorId: '2' }
]

let authors = [
    { name: 'Hajime Isayama', age: 37, nationality: 'Nihon (Japanese)', id: '1' },
    { name: 'Rachel Smythe', age: 37, nationality: 'Aotearoa (New Zealander/Kiwi)', id: '2' },
    { name: 'Madeline Miller', age: 45, nationality: 'United States of America (American)',id: '3' }
]

// {
//     authors{
//         name
//         age
//         nationality
//         books{
//           name
//           pages
//           published
//           awards
//         }
//     }
//   }

module.exports = { books, authors }