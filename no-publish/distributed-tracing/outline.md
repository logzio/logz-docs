---
layout: article
title: Distributed Tracing with Jaeger
permalink: /user-guide/tracing/
flags:
  logzio-plan: community
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---
##### Outline 

### ------- Yael's Question Dump

- What is the tracing onboarding?
- What do I/users know already /what assumptions do we make about what "I"  know?
- What new terms do I need to know?
- Overview of how the infor gets into the [logz.io](http://logz.io) system/what it's derived from?
- What do I see at different stages of using the tracing/Jaeger interface?
- What can I select? How do I build my tracing options?
- What do I see after I select options? What is displayed?
- How can I interact with the display/visualization?
- How can I change my view?
- What else can I do with my results?
- Suggestions? Tips? Best practices?

### --------

# Overview of what tracing is and "what's in it for me?"

The lovely granularity you get when you look under the hood at how your microservices are interacting

The rich information that you can parlay into improving the time it takes to get things done and investigating - and then troubleshooting - potential timing/firing issues

# Definitions and terminology

What is a trace?
What is a span?
What is a node?
How are spans grouped?

# What you will see - what a set of spans in a trace looks like

Search <br>
Alternate views <br>
Compare <br>

### Examples

Several trace pattern examples/use cases - and starting points for troubleshooting issues in microservice transactions

# What you have to do to get set up - before you can use Distributed Tracing in logz.io

Decide what your source will be, deployment decisions, instrumentation decisions, agent or no? 

Maybe a diagram? 

# Prerequisites:  

### Instrumentation  

- Automatic

- Manual

pretagging your data before ingestion

What you can get support for from us...and what is not supported. 

## Deployment stages

Required and optional components

## Data ingestion into Logz.io

How do I do this?

# Getting started once your tracing data is in place

What can I configure? 

How do I create a query?

# Viewing traces: by grouped spans or by timeline

How do I see my trace?

# Comparing traces

Layout of the Compare page
What do the colors mean? 

# WHAAAAT! Tracing data in Kibana?? 

Tell me MORE!

# Jaeger APIs?




| Parameter | Description |
|---|---|
| param1 (Required) | Include this span if parameter is required. Required params are always at the top of the list, with rare exception. |
| param2 <span class="default-param">`"default value"`</span> | If there's a default, include it here. <br> If you need a line break, hard code it. |
{:.paramlist}