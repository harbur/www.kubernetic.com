---
slug: 'gitops-with-argocd'
title: 'Run GitOps with ArgoCD'
date: '2020-08-01'
author: 'Dimitirs Kapanidis'
description:
  'A step-by-step guide to install ArgoCD to your Kubernetes cluster and do GitOps.'
categories:
  - 'tutorial'
keywords:
  - 'gitops'
  - 'argocd'
banner: './images/banner.jpg'
bannerCredit: 'Photo by [Joshua Earle](https://unsplash.com/photos/ICE__bo2Vws)'
---

import List from 'components/mdx/list'
import Li from 'components/mdx/li'

In this tutorial we'll prepare a Kubernetes cluster from scratch along with
ArgoCD to do our CD of our demo application.

# Preparation

Before diving with the tutorial steps let's see what we'll be building first:

## Our demo app

The demo application that we'll be deploying is a movie catalog service that
consists of two components:

- a backend in written Go.
- a frontend written in React.

The code of each component exists on each own Git repository, and we co-locate
the deployment resources, in Helm chart format, inside each repo.

## Our infra

We'll be using a Kubernetes cluster to run our components, we can use any
Kubernetes instance, during tutorial we'll be running a `kind` cluster which
only depends on having docker installed on your machine. We'll skip the image
building process of the repositories, instead we'll be consuming the images
directly from the DockerHub. The installation of ArgoCD we'll be managed by
Operator Lifecycle Manager, which we'll add it as an addon to the cluster and
the deployment of the components will be managed by ArgoCD so that any changes
on the Git repositories will be automatically propagated on Kubernetes.

# Tutorial

The tutorial is separated in the following sections:

- **Kubernetes Setup**: Preparation of the Kubernetes cluster.
- **Kubernetic Setup**: Preparation of the Kubernetic Desktop app.
- **Operator Lifecycle Manager**: Installation of OLM.
- **ArgoCD**: Installation of ArgoCD.
- **MovieCatalog**: Installation of MovieCatalog Application.

## Kubernetes Setup

![kind](./images/kind.png)

There are various ways to [create a Kubernetes cluster], though during this
tutorial we'll be using [kind] which we find it to be the easiest way to run
kubernetes locally.

[create a kubernetes cluster]: https://docs.kubernetic.com/1.0.-create-a-cluster
[kind]: https://kind.sigs.k8s.io/docs/user/quick-start/
[install docker]: https://docs.docker.com/install/

Kind is a tool for running local Kubernetes clusters using Docker container
“nodes”. To use kind, you will also need to [install docker].

kind consists of:

- A command-line tool (kind)
- Docker image(s) written to run Kubernetes.

> **_STEP 1:_** [Install Docker]

Since `kind` depends on Docker to run, if you don't have already docker
installed follow the installation guides on their homepage. Once you finish you
should be able to run the following command to run a simple `hello-world`
container:

```shell
➜ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete
Digest: sha256:49a1c8800c94df04e9658809b006fd8a686cab8028d33cfba2cc049724254202
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
```

> **_STEP 2:_** [Install kind]

[install kind]: https://kind.sigs.k8s.io/docs/user/quick-start/

Now that we have docker running, let's install the `kind` command-line tool so
that we can start a kubernetes inside a container.

Depending on your operating system the installation process may vary:

On Linux:

```shell
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.8.1/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

On Mac:

```shell
brew install kind
```

On Windows:

```shell
curl.exe -Lo kind-windows-amd64.exe https://kind.sigs.k8s.io/dl/v0.8.1/kind-windows-amd64
Move-Item .\kind-windows-amd64.exe c:\some-dir-in-your-PATH\kind.exe
```

Once you finish with the installation you can check the installed version like
so:

```shell
➜ kind --version
kind version 0.8.1
```

> **_STEP 3:_** [Install kubectl]

[install kubectl]: https://kubernetes.io/docs/tasks/tools/install-kubectl/

The Kubernetes command-line tool, kubectl, allows you to run commands against
Kubernetes clusters.

On Linux:

```shell
curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.18.2/bin/linux/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```

On Mac:

```shell
brew install kubectl
```

On Windows:

```shell
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.18.2/bin/windows/amd64/kubectl.exe
Move-Item .\kubectl.exe c:\some-dir-in-your-PATH\kubectl.exe
```

Once installed you can run the following to check the version of the client, it
should match the one you downloaded:

```shell
➜ kubectl version --client
Client Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.2", GitCommit:"52c56ce7a8272c798dbc29846288d7cd9fbae032", GitTreeState:"clean", BuildDate:"2020-04-16T23:35:15Z", GoVersion:"go1.14.2", Compiler:"gc", Platform:"darwin/amd64"}
```

> **_STEP 4:_** Run Kubernetes

Now that we have all the necessary bits installed locally we can start our
cluster. To do that simply run:

```shell
➜ kind create cluster
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.18.2) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind
```

kind has successfuly run a container image that is running a kubernetes cluster
and has configured your kubectl context to `kind-kind` so your kubectl commands
now point to the freshly created cluster.

Let's check the list of nodes on the cluster:

```shell
➜ kubectl get nodes
NAME                 STATUS   ROLES    AGE     VERSION
kind-control-plane   Ready    master   3m23s   v1.18.2
```

Our cluster is now up and ready.

### Finishing this section you will have:

<List>
  <Li check>Docker installed and running.</Li>
  <Li check>Kind CLI installed locally.</Li>
  <Li check>Kubectl CLI installed locally.</Li>
  <Li check>A Kubernetes cluster running inside a container.</Li>
</List>

## Kubernetic Setup

Now that we have our cluster up and running let's manage it with Kubernetic.

[Kubernetic] is a Desktop application that manages Kubernetes clusters. It can
run on Mac, Linux or Windows.

[kubernetic]: https://kubernetic.com/

### Mac Installation

- Download Mac version from
  [here](https://kubernetic.s3.amazonaws.com/Kubernetic-2.9.1.dmg).

The file is DMG format, double click and it will open the installer dialog:

![kubernetic-installer-mac](./images/kubernetic-installer-mac.png)

Drag Kubernetic icon to the Applications folder to perform the installation.

### Linux Installation

...

### Windows Installation

...

Once Kubernetic is installed you can launch it and it should connect to your
existing cluster `kind-kind`.

![kubernetic-started](./images/kubernetic-started.png)

Kubernetic uses the kubeconfig to connect to the clusters. You can customize the
kubeconfig location in the Preferences section or even configure multiple
kubeconfig files if you handle a lot of clusters in different files.

### Finishing this section you will have:

<List>
  <Li check>Kubernetic installed and running.</Li>
</List>

## Operator Lifecycle Manager

We'll be using OLM to install the ArgoCD operator.

![olm](./images/olm.svg)

Operator Lifecycle Manager (OLM) is a component of the [Operator Framework], an
open source toolkit to manage Kubernetes native applications, called Operators,
in an effective, automated, and scalable way. OLM extends Kubernetes to provide
a declarative way to install, manage, and upgrade Operators and their
dependencies in a cluster.

[operator framework]: https://github.com/operator-framework

Operator Framework has recently [moved to CNCF] for incubation, a neutral
foundation which is also a part of the larger Linux Foundation. Which will help
to the project with governance, marketing support and community outreach,
possibly converting it to the de-facto way of managing operators in Kubernetes.

[moved to cncf]:
  https://www.openshift.com/blog/operator-framework-moves-to-cncf-for-incubation

> **_STEP 1:_** Install OLM

Open Kubernetic and go to the Context view: `Contexts > kind-kind`

![olm installation](./images/olm.png)

Here you can choose to install different addons to the cluster, one of them is
the Operator Lifecycle Manager. You can click on `Preview` before installing to
review what will be installed beforehand:

![olm preview](./images/olm-preview.png)

For more details you can check the [OLM installation guide].

[olm installation guide]:
  https://github.com/operator-framework/operator-lifecycle-manager/blob/master/doc/install/install.md

Click on `Install` to perform the installation, once installed a new menu
section will appear for the Operators on the left-side.

![olm installed](./images/olm-installed.png)

You can also check the installation through `kubectl`:

- check that Operator Lifecycle Manager CRDs are installed:

```shell
➜ kubectl get crds
NAME                                          CREATED AT
catalogsources.operators.coreos.com           2020-08-02T13:05:23Z
clusterserviceversions.operators.coreos.com   2020-08-02T13:05:24Z
installplans.operators.coreos.com             2020-08-02T13:05:24Z
operatorgroups.operators.coreos.com           2020-08-02T13:05:24Z
subscriptions.operators.coreos.com            2020-08-02T13:05:24Z
```

- check the CSV is installed properly:

```shell
➜ kubectl get csv -n olm
NAME            DISPLAY          VERSION   REPLACES   PHASE
packageserver   Package Server   0.15.1               Succeeded
```

Make sure the packageserver is in Succeeded phase before continuing, it is the
one that populates the resources below.

- check the PackageManifests are ready:

```shell
➜ kubectl get packagemanifests
NAME                                       CATALOG               AGE
istio                                      Community Operators   10m
argocd-operator                            Community Operators   10m
...
```

### Finishing this section you will have:

<List>
  <Li check>
    Operator Lifecycle Manager (OLM) installed and ready in your cluster.
  </Li>
</List>

## ArgoCD Installation

### Finishing this section you will have:

<List>
  <Li check>ArgoCD installed and ready in your cluster.</Li>
</List>
