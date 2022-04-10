/* eslint-disable max-len */
import {Handler} from '@netlify/functions';
import {Octokit} from '@octokit/core';

const handler: Handler = async (event, context) => {
  const githubToken = String(process.env.OCTOKIT_GITHUB_TOKEN);
  const workflowId = Number(process.env.UPDATER_GA_WORKFLOW_ID);

  const octokit = new Octokit({auth: githubToken});

  await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner: 'realtime-trends',
    repo: 'realtime-trends-updater',
    workflow_id: workflowId,
    ref: 'main',
    inputs: {
      branch: 'data',
      github_token: githubToken,
      key: '0',
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Success'}),
  };
};

export {handler};
