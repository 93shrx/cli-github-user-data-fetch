const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let githubUser;


async function getGithubUserInfo() {
    if (!githubUser) {
        console.log('GitHub username not provided.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${githubUser}/events`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'Bearer YOU TOKEN HERE',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching GitHub user info:', error);
    }
}

rl.question('Enter a GitHub username: ', async (username) => {
    githubUser = username;
    await getGithubUserInfo();
    rl.close();
});