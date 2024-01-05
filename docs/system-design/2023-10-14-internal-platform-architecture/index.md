---
title: From Internal Operation Platform to Internal Platform

---
# From Internal Operation Platform to Internal Platform

I've been designing / developing serveral internal platforms in recent years, primarily serving our operators and developers at the company. The more I delve into this development, the clearer the underlying patterns become. So, I've dedicated time to contemplate the products and strategies involved in my day-to-day work.

## Internal Operation Platform Architecture
Below is the architecture of an internal operation platform. In a typical setup, it comprises several components:
- **Internal Operation Portal**: A web portal for operators to manage internal Ops data.
- **Internal Operation API**: A set of APIs for the internal operation portal to consume.
- **Internal Operation data**: A dataset for the internal operation API to utilize.

![Internal Operation Platform Architecture](int_ops_platform.png#light-mode)![Internal Operation Platform Architecture](int_ops_platform_dark.png#dark-mode)


## Internal Platform Architecture
After years of development, our company has created several internal operation platforms/products, each serving specific purposes in various domains. However, as workflows become increasingly complex, operators often need to navigate multiple platforms to complete a single task.
In the meantime, developers are tasked with maintaining these platforms, each built with different technologies and frameworks. Despite this diversity, the core business logic remains largely uniform, leading to redundant code and logic in areas like authentication, authorization, and logging. To address this, we decided to integrate these platforms into a unified internal platform.

Below is the architecture of this integrated internal platform.

![Internal Platform Architecture](int_ops_w_platform.png#light-mode)![Internal Operation Platform Architecture](int_ops_w_platform_dark.png#dark-mode)

The platform team is developing an infrastructure-as-a-service platform, enabling other operations teams to create and distribute internal and client-facing web portals, widgets, and backend data sources. This platform offers reusable functionality and access to common company services, such as API and SSO integration, Web Analytics support, and a static asset hosting solution. Additionally, we aim to standardize the web application development ecosystem, establishing infrastructure for application bootstrapping, local development sandboxes, build/deploy pipelines, and testing frameworks to streamline the application development lifecycle.

Internal platforms reduce technical complexity and cognitive load for developers. The platforms team is guiding our web ecosystem towards a more user-friendly, unified state by advocating best practices and standardizing tools across web application teams.

## Dilemma and Challenges
## Product Mindset
Our primary customers are fellow engineers within the company. While many engineers focus on customer-centric tools/applications, a significant number are engaged in internal development. Platform teams require extensive knowledge in infrastructure, automation, and security. This expertise is crucial for constructing a well-orchestrated internal platform.

(Consider elaborating on specific challenges faced during the integration of these platforms,  such as technical debt,interoperability issues, or resistance to change ... )
