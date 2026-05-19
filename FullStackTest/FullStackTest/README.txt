----------------------------------
Information:
----------------------------------
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

{
	PolicyNumber: int,
	PolicyHolder: {
		Name: string,
		Age: int,
		Gender: emum
	}
}

The data classes are already provided for you within "Data/".

----------------------------------
Test Requirements:
----------------------------------
1. A professional looking website is required that will display all policies from the repository.
2. The website should allow a user to perform CRUD operations on policies.

----------------------------------
Considerations:
----------------------------------
1. It is up to you how you design the website and UX, structure the code and implement the CRUD operations.
2. You may use existing CSS/frameworks to create a professional looking front end.
3. Showcase any industry best practices you deem relevant to support your submission.
4. In the event you do not have enough time to implement some of the changes you wish to showcase, please provide a summary of enhancements/improvements in the CandidateNotes.txt provided in the project.





