# Just-In-Time Grooming

## A failed grooming meeting

You are part of an Agile team, working on a legacy project. You need to ensure
that incoming tickets are ready for your team to work on. You set up a
recurring grooming meeting to go over the upcoming work. You invite the whole
team and some stakeholders.

At first, things probably go well. But as time goes on, you notice fewer and
fewer people are participating. Shareholders stop attending unless someone
remembers to ask them. You might start needing to prompt your senior engineers
to get anything going at all. Ticket quality suffers. Engineers still need more
clarification when they start tickets. They submit more work that fails to
solve the true intent of the ticket and requires rework.

## Problem: A torrent of tickets

When your grooming meeting needs to cover more than 2 tickets, attention starts
to wander for various reasons. People will still be thinking about the last
ticket or their current work while you are reading through the current ticket.
People will not admit that they did not pick up the current context and will
instead remain silent.

## Problem: An off ownership

Ownership leads to motivation. Lack of ownership leads to phoning things in.
When you have little chance of owning a ticket, there is little reason to
expend your limited energy on it.

## Problem: A distance of mind

For the engineer who does work the ticket, so much time elapses between the
grooming discussion and starting work that all the nuances of discussion get
lost. More likely, the engineer doesn't remember anything about the discussion
in the grooming meeting since they didn't expect to own the ticket. When the
engineer doesn't remember they will need to do discovery again.

## Problem: A shortage of shareholders

A weekly standing meeting where people primarily discuss things you have no
interest in at all is not a meeting you will attend. Shareholders will not want
to take an hour out of their day.

## Another solution

First, let me note that this is not a universal solution to all grooming needs,
this is meant to be the default method of grooming tickets and a full team
grooming meeting is still an option in various circumstances.

Lets have a new type of meeting to avoid those problems. Everyone involved is
has ownership of the outcome. Work will start immediately. The meeting itself
is very short and to the point. How do we accomplish that?

## What is the goal

The goal is your standard grooming, but only for a single ticket. That means
that the ticket should have clear acceptance criteria. The engineer should be
able to immediately start work with a clear understanding of the goal. There is
also a failure state where it can be decided the engineer cannot yet start work
on the ticket.

If you need an estimate, the engineer will give it after the acceptance
criteria have been determined (note: everyone should do p10-p50-p90 estimates).

## Who is invited

To get good acceptance criteria, you need a user representative, a test
representative, and a engineering representative. The user and tester will be
able to discuss how they would know the problem in question is solved, while
the engineer provides feedback into the feasibility of the acceptance criteria.

The test representative can be QA/UAT or, as a last resort, another engineer.
The user representative is ideally a user or stakeholder, but could be a PM or
manager. The shorter duration, flexible timing, and focus makes it a more
attractive meeting for users and stakeholders.

## When does this happen

We want the engineer to start work immediately, so once the engineer has no
work in progress the meeting can be called or scheduled for the next ticket in
their priority queue.

## Duration

Once the team gets the hang of it, the meeting will probably take about 5 to 15
minutes.

## What is the agenda

Start the meeting by having the user rep go over the ask. Then all three can
create and discuss the acceptance criteria. The acceptance criteria need to be
clear to both testing and engineering. Ensure the criteria are written to the
ticket for future reference.

If an estimate is required, the engineer will give it at this point. Since the
engineer will be the one completing the ticket, there should not be discussion
about it. This will conclude the meeting and the engineer can start work.

## Downsides

Like all tools, JIT Grooming has pros and cons.

A full team meeting is an opportunity to break down siloing and increase team
cohesion, so dropping one could cause problems. On the flip side,
low-engagement full team meetings do not do much about those problems either.
The solution is to figure out what full team meetings generate the most
engagement and cohesion and double down on those.

## Conclusion

When we implemented this, the feedback after a month was very positive. We
found that engineers liked being able to immediately get into work after
discussion. The product manager liked being able to bring in stakeholders. The
manager liked avoiding a low-value-per-capita meeting. Test immediately noticed
the improvement in acceptance criteria, making their jobs easier. No one wanted
to go back to the full team grooming, but we did decide some projects could
benefit from doing a special full team meeting.
