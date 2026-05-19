# Full Stack Developer Technical Test

## Purpose and Instructions

### Purpose

As it is difficult to fully assess somebody’s abilities at an interview, particularly their programming skills, we give a small programming exercise to all potential recruits. The problem is a fairly simple one, which should be completed in the applicant’s own time.

This is an opportunity for the candidate to show their engineering knowledge and craft work.  We are looking for engineering best practice. The test will be scored accordingly. 

This is a very important part of our hiring process. Therefore we recommend that candidates give this adequate consideration and address this task as they would do for any other professional assignments in their current workplace.

### Instructions 

-   We use GitHub to host these tests to create a modern practical engineering experience. Please complete this exercise and create a pull request containing your solution 
-   We recommend you create a development branch for your development and from this create a final pull request to the master branch for review
-   We would much prefer that you submit a complete software implementation that demonstrates modern engineering best practices.  However we also appreciate that to provide a complete solution we may be expecting too much of the candidates time. If you are pressed for time, please provide a summary of enhancements/improvements in the CandidateNotes.txt file provided in the project, and/or use the pull request to comment on areas that, given more time, you would address or have done differently. 
-   Please update the RUNME.MD file with instructions how to run your application 

**Please note that your submission must only contain your own work. Under no circumstances should your submission contain any content owned or created (in whole or in part) by a third party except where you are expressly permitted to do so by the relevant third party. You may, for instance, use an open-source library for ancillary tasks, though you should not use one for the primary algorithms. Use of AI is allowed, under the condition that you understand and disclose where and how it was used.**

## Exercise

### Information:
The solution contains an Asp.Net Core project and an Angular cli project. Visual Studio 2022 will be needed to run this solution. 

A free community edition can be found here:

https://visualstudio.microsoft.com/vs/community/

Details on setting up Angular can be found here:

https://angular.io/guide/setup-local

This solution uses Angular version 19.1.6 minimum, so please ensure your current node version is compatible (if applicable).

Pressing F5 in Visual Studio will build both the server side and client side code and launch the website - once the proxy finshes loading you should be met with "WTW Client App Loaded." in your browser window.
Client side code can be edited in Visual Studio or any other IDE (e.g. VSCode) of your choosing.

Server side, you have been provided with a single API controller called "Controllers/PolicyController.cs", and a repository "Data/PolicyRepository.cs" for storing policies.
Each policy object has the following structure:

```
{
	PolicyNumber: int,
	PolicyHolder: {
		Name: string,
		Age: int,
		Gender: emum
	}
}
```

The data classes are already provided for you within "Data/".

### Test Requirements:
1. A professional looking website is required that will display all policies from the repository.
2. The website should allow a user to perform CRUD operations on policies.

### Considerations:
1. It is up to you how you design the website and UX, structure the code and implement the CRUD operations.
2. You may use existing CSS/frameworks to create a professional looking front end.
3. Showcase any industry best practices you deem relevant to support your submission.
4. In the event you do not have enough time to implement some of the changes you wish to showcase, please provide a summary of enhancements/improvements in the CandidateNotes.txt provided in the project.

## Copyright
© 2026 WTW. All rights reserved. Proprietary and Confidential. For WTW employees and candidates only.
