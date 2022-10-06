<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/chowsteven/refreshmints">
    <img src="https://user-images.githubusercontent.com/106450121/194190215-721e10f3-9e9f-46eb-97f5-e79596970cd3.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Refreshmints</h3>
  <p align="center">A website that shows the latest Ethereum NFT activity</p>

</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#lessons-learned-and-afterthoughts">Lessons Learned and Afterthoughts</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
[**Live Demo 👇**](https://refreshmints.vercel.app)

[![image](https://user-images.githubusercontent.com/106450121/194192337-f6652c44-1462-431f-af45-426025577c97.png)](https://refreshmints.vercel.app)

A little website created to emulate parts of [NFTNerds](https://nftnerds.ai). Some information that NFTNerds provides, such as the most recent listings & sales of a collection, 1 minute/5 minute trending collections, etc. are locked behind a paywall. So I made this to see what I'm missing out on.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Next][Next.js]][Next-url]
* [![Vercel][Vercel]][Vercel-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Tailwind][TailwindCSS]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these steps

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [Reservoir](https://reservoir.tools) and [Etherscan](https://etherscan.io)
2. Clone the repo
   ```sh
   git clone https://github.com/chowsteven/refreshmints.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `.env.local`
   ```
   ETHERSCAN_API_KEY=YOUR_API_KEY
   RESERVOIR_API_KEY=YOUR_API_KEY
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Infinite scrolling
- [ ] Firehose similar to that of [NFTNerds](https://nftnerds.ai/firehose)
- [ ] Visual information (charts & graphs)
- [ ] Improved fetching
    - [ ] Better caching
    - [ ] Smarter fetch intervals
    - [ ] 15 minute/1 hour/1 day/7 day information

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

For now, please open a new issue!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Special thanks to

* [Reservoir](https://reservoir.tools) for their amazing API and continued work
* [Etherscan](https://etherscan.io) for the real-time Ethereum information
* [NextJS](https://nextjs.org) and [Vercel](https://vercel.com) for an incredibly smooth developing & deploying experience

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LESSONS LEARNED -->
## Lessons Learned and Afterthoughts

This project was really a chance for me to try out TypeScript & NextJS. I don't really need up-to-date NFT data, but I saw Reservoir's API and figured I might as well make a project around it in case I do need it in the future (I probably won't).

Anyway, it turns out that TypeScript was able to catch a bunch of type errors as I was developing, and Next provided a very smooth and intuitive framework for React. Using both together was quite fun. I think for this project specifically, Create-React-App instead of Create-Next-App would have worked just fine because there are not many static pages on the site. If I start blogging in the future though, I will definitely take advantage of Next. Going forward, TypeScript will probably replace JavaScript for me.

Another new thing I used was [useSWR by Vercel](https://swr.vercel.app/) for the data fetching. I think it is very powerful but my current implementation might not be the best. Refreshing seems to always re-fetch the data instead of taking from cache and fetching looks like it occurs a lot. I have some ideas to fix it, so I put it in the roadmap for now.

There's a lot more to NFTNerds that I have not implemented, like [scatterplots of the latest trades](https://user-images.githubusercontent.com/106450121/194201284-85e3edc6-029c-46ca-ba54-2b25c740d5fb.png). Definitely one of the higher priority things to get to.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://typescriptlang.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
