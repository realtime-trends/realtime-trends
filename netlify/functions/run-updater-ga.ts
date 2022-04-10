/* eslint-disable max-len */
import {Handler} from '@netlify/functions';
import {Octokit} from '@octokit/core';

const handler: Handler = async (event, context) => {
  const octokit = new Octokit({auth: process.env.OCTOKIT_GITHUB_TOKEN});

  await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner: 'realtime-trends',
    repo: 'realtime-trends-updater',
    workflow_id: 23875462,
    ref: 'main',
    inputs: {
      branch: 'data',
      key: '0',
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Success'}),
  };
};

export {handler};
