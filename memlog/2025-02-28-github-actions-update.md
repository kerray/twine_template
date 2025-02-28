# GitHub Actions Workflow Update (2025-02-28)

## Work Completed

- Updated the GitHub Actions workflow file (.github/workflows/build-and-deploy.yml) to use the latest versions of actions:
  - Updated actions/checkout from v3 to v4
  - Updated actions/upload-artifact from v3 to v4 (which was deprecated)

## Reason for Update

The previous version of the actions/upload-artifact action (v3) has been deprecated according to GitHub's changelog: https://github.blog/changelog/2024-04-16-deprecation-notice-v3-of-the-artifact-actions/

This update ensures that the GitHub Actions workflow will continue to work without issues and follows best practices by using the latest versions of actions.

## Benefits

- Prevents workflow failures due to deprecated actions
- Takes advantage of any improvements or bug fixes in the latest versions of actions
- Ensures long-term maintainability of the CI/CD pipeline