const colorSchemeLabel = document.querySelector('[class*="header__toggle-label"]');
const colorSchemeToggle = document.querySelector('.header__toggle');
const allElements = Array.from(document.getElementsByTagName("*"));
const blogLink = document.querySelector('.card__list-link_blog');
const companyLink = document.querySelector('.card__list-link_company');
const twitterLink = document.querySelector('.card__list-link_twitter');
const searchBarButton = document.querySelector('.search-bar__button');
const searchBarInput = document.querySelector('.search-bar__input')

const setColorSchemeLabelOnLoad = () => matchMedia("(prefers-color-scheme: light)").matches ? colorSchemeLabel.textContent = 'DARK' : colorSchemeLabel.textContent = 'LIGHT';

const toggleModeHandler = () => {
  if(colorSchemeLabel.textContent === 'LIGHT') {
    colorSchemeLabel.textContent = 'DARK';
    allElements.forEach(element => {
      element.classList.remove("dark");
      element.classList.add("light");
    });
  } else {
    if(colorSchemeLabel.textContent === 'DARK') {
      colorSchemeLabel.textContent = 'LIGHT';
      allElements.forEach(element => {
        element.classList.remove("light");
        element.classList.add("dark");
      });
    }
  }
};

const prefersDarkModeHandler = (e) => {
  if (e.matches) {
    colorSchemeLabel.textContent = 'LIGHT';
    allElements.forEach(element => {
      element.classList.remove("light");
      element.classList.remove("dark");
    });
  }
};

const prefersLightModeHandler = (e) => {
  if (e.matches) {
    colorSchemeLabel.textContent = 'DARK';
    allElements.forEach(element => {
      element.classList.remove("dark");
      element.classList.remove("light");
    });
  }
};

const getUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const { login = "", avatar_url = "", name = "", company = "", blog = "", location = "", bio = "", twitter_username = "", public_repos = 0, followers = 0, following = 0, created_at = "" } = await response.json();
  return { login, avatar_url, name, company, blog, location, bio, twitter_username, public_repos, followers, following, created_at };
}

const convertIsoDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString('default',{month:'short'});
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const setUser = (user) => {
  const { login, avatar_url, name, company, blog, location, bio, twitter_username, public_repos, followers, following, created_at } = user;
  
  !blog ? blogLink.setAttribute("href", "#") : blogLink.setAttribute("href", blog);
  !company ? companyLink.setAttribute("href", "#") : companyLink.setAttribute("href", `https://github.com/${company.slice(1)}`);
  !twitter_username ? twitterLink.setAttribute("href", "#") : twitterLink.setAttribute("href", `https://twitter.com/${twitter_username}`);
  document.querySelector('.card__avatar').src = avatar_url;
  document.querySelector('.card__name').textContent = name ?? login;
  document.querySelector('.card__login').textContent = `${"@"}${login}`;
  document.querySelector('.card__bio').textContent = bio ?? "This profile has no bio";
  document.querySelector('.card__createdon').textContent = `${"Joined"} ${convertIsoDate(created_at)}`;
  document.querySelector('.company').textContent = company ?? "Not Available";
  document.querySelector('.location').textContent = location ?? "Not Available";
  document.querySelector('.location').textContent = location ?? "Not Available";
  document.querySelector('.twitter').textContent = twitter_username ?? "Not Available";
  document.querySelector('.blog').textContent = blog ?? "Not Available";
  document.querySelector('.repos').textContent = public_repos;
  document.querySelector('.followers').textContent = followers;
  document.querySelector('.following').textContent = following;
}

setColorSchemeLabelOnLoad();
matchMedia('(prefers-color-scheme: light)').addEventListener('change', prefersLightModeHandler);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', prefersDarkModeHandler);
colorSchemeToggle.addEventListener('click', toggleModeHandler);
const octocat = await getUser('octocat');
setUser(octocat);
searchBarButton.addEventListener('click', async () => {
  const username = searchBarInput.value;
  const user = await getUser(username);
  if (!user) {
    alert('User not found');
    return;
  }
  setUser(user);
});
