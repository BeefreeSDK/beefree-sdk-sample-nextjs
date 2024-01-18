# beefree-sdk-nextjs
This is a full-stack application built with NextJS, Python, and a SQLite database; allowing you to mimic a host app with your beefree SDK integrated. Feel free to hook up your own backend app if you'd like.

View our docs at https://docs.beefree.io/initializing-bee-plugin.

***You must have Python (https://www.python.org/downloads/) and Node.js 16.8 (https://nodejs.org/en) or later installed on your computer.***

## To initialize backend
in your terminal:
1. `cd backend`
2. `python3 -m venv env`
3. `source env/bin/activate`
4. `pip3 install -r requirements.txt`
5. `python3 manage.py migrate`
6. `python3 manage.py runserver`

The backend should now be running on http://localhost:8000/api/

## To initialize frontend
1. in your terminal `cd frontend`
2. create a `.env.local` file at the root of the `frontend` directory
3. copy text from env_local_example.txt into your `.env.local` file
4. set the environment variables in the `.env.local` file with the ClientIDs and SecretKeys in your Beefree SDK Dev portal: https://developers.beefree.io/subscriptions/

### After you have your environment variables set, start frontend
run the following commands in your terminal (don't mind the warnings):
- `npm install` or `yarn install`
- `npm run dev` or `yarn dev`
- you can make changes within the `beefree_config` function in the `/frontend/utils/bee_configuration.jsx` file to update your Beefree SDK configuration

The project should now be running on http://localhost:3000/

For new users, go to http://localhost:3000/authentication/register and sign up as a new user.
