using FullStackTest.Data;
using Microsoft.AspNetCore.Mvc;

namespace FullStackTest.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PolicyController : ControllerBase
{
    private readonly IPolicyRepository _policyRepository;

    public PolicyController(IPolicyRepository policyRepository)
    {
        _policyRepository = policyRepository;
    }


    [HttpGet]
    public IEnumerable<Policy> Get()
    {
        return _policyRepository.Get();
    }

    [HttpGet("{policyNumber}")]
    public ActionResult<Policy> GetByPolicyNumber(int policyNumber)
    {
        var policy = _policyRepository.GetByPolicyNumber(policyNumber);
        if (policy == null)
            return NotFound();
        return Ok(policy);
    }

    [HttpPost]
    public ActionResult<Policy> Create([FromBody] Policy policy)
    {
        if (_policyRepository.GetByPolicyNumber(policy.PolicyNumber) != null)
            return Conflict($"A policy with number {policy.PolicyNumber} already exists.");

        _policyRepository.Add(policy);

        return CreatedAtAction(nameof(GetByPolicyNumber), new { policyNumber = policy.PolicyNumber }, policy);
    }

    [HttpPut("{policyNumber}")]
    public ActionResult<Policy> Update(int policyNumber, [FromBody] Policy policy)
    {
        if (_policyRepository.GetByPolicyNumber(policyNumber) == null)
            return NotFound();

        policy.PolicyNumber = policyNumber;
        _policyRepository.Update(policy);

        return Ok(policy);
    }

    [HttpDelete("{policyNumber}")]
    public ActionResult Delete(int policyNumber)
    {
        if (_policyRepository.GetByPolicyNumber(policyNumber) == null)
            return NotFound();

        _policyRepository.Remove(policyNumber);

        return NoContent();
    }
}
